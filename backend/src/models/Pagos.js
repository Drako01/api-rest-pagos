import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Conexion.js';

const Pagos = sequelize.define('Pagos', {
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0.01 }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tipoPago: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: { len: [2, 60] }
  },
  destinatario: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: { len: [2, 120] }
  }
}, {
  tableName: 'Pagos',
  timestamps: true
});

export { Pagos };
