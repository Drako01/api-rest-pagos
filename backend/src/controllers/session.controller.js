import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js';
import config from '../config/config.js';
import loggers from '../config/logger.js';


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const secretKey = config.jwt.privateKey;
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        loggers.error('Error en el inicio de sesión:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export { loginUser };

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'Token no proporcionado' });
    }

    const secret = config.jwt.privateKey;
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        } else {
            req.user = decodedToken;
            next();
        }
    });

};

export { requireAuth };

const signUpUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.createUser({
            email: email,
            password: hashedPassword
        });

        const secretKey = config.jwt.privateKey;
        const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

export { signUpUser };