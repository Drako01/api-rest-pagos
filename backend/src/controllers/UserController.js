import UserModel from '../models/UserModel.js';

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.getAllUsers();
      return res.json({
        data: users.map((user) => ({ id: user.id, email: user.email, createdAt: user.createdAt }))
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
