import { Usuario } from '../models/Usuario.js'; 

class UserModel {

    async getAllUsers() {
        try {
            const users = await Usuario.findAll();
            return users.map(user => user.toJSON());
        } catch (error) {
            throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
        }
    }
    
    async createUser(userData) {
        try {
            const newUser = await Usuario.create({
                email: userData.email,
                password: userData.password
            });
            return newUser.id;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {            
            const user = await Usuario.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return user.toJSON(); 
        } catch (error) {
            throw new Error(`Error al obtener el usuario: ${error.message}`);
        }
    }
}

export default new UserModel();
