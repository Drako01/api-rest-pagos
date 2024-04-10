import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Conexion.js'; 

const Pagos = sequelize.define('Pagos', {
    
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipoPago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destinatario: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Pagos.sync(); 

export { Pagos };
