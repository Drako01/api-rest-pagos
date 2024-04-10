import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Conexion.js'; 

const Usuario = sequelize.define('Usuario', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Usuario.sync();

export { Usuario };
