import { Sequelize } from 'sequelize';
import loggers from './logger.js';
import config from './config.js';

const sequelize = new Sequelize({
    dialect: config.db_conexion.dialect,
    host: config.db_conexion.host,
    port: config.db_conexion.port,
    username: config.db_conexion.username,
    password: config.db_conexion.password,
    database: config.db_conexion.database,
    logging: false
});

async function conectar() {
    try {
        await sequelize.authenticate();
        loggers.info('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        loggers.error('Error al conectar a la base de datos:', error.message);
        process.exit(1); 
    }
}


async function desconectar() {
    try {
        await sequelize.close();
        loggers.info('Conexión a la base de datos cerrada correctamente.');
    } catch (error) {
        loggers.error('Error al cerrar la conexión a la base de datos:', error);
    }
}

export { sequelize, conectar, desconectar };
