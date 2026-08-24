import { Sequelize } from 'sequelize';
import config from './config.js';
import loggers from './logger.js';

const sequelize = new Sequelize({
  dialect: config.db.dialect,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  logging: config.db.logging ? (message) => loggers.debug(message) : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30_000,
    idle: 10_000
  }
});

async function conectar() {
  await sequelize.authenticate();
  loggers.info('Database connection established');

  if (config.db.sync) {
    await sequelize.sync();
    loggers.warn('DB_SYNC=true: Sequelize schema synchronization executed');
  }
}

async function desconectar() {
  await sequelize.close();
  loggers.info('Database connection closed');
}

export { sequelize, conectar, desconectar };
