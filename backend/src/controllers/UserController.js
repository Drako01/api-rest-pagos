import UserModel from '../models/UserModel.js'; 
import bcrypt from 'bcrypt';

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10); 
            const newUser = await UserModel.createUser({
                email: email,
                password: hashedPassword 
            });
            return res.status(201).json({ message: 'Usuario creado exitosamente', userId: newUser.id });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    

    async getUserByEmail(req, res) {
        try {
            const email = req.params.email;
            const user = await UserModel.getUserByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UserController();
