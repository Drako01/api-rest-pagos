import { Usuario } from './Usuario.js';

class UserModel {
  async getAllUsers() {
    return Usuario.findAll({ order: [['createdAt', 'DESC']] });
  }

  async createUser({ email, password }) {
    return Usuario.create({ email, password });
  }

  async getUserByEmail(email, { includePassword = false } = {}) {
    const model = includePassword ? Usuario.scope('withPassword') : Usuario;
    return model.findOne({ where: { email: email.trim().toLowerCase() } });
  }

  async getUserById(id) {
    return Usuario.findByPk(id);
  }
}

export default new UserModel();
