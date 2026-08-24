import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Conexion.js';

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING(160),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Usuarios',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: { attributes: {} }
  }
});

export { Usuario };
