import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const parseOrigins = (value) => (value || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || process.env.PROD_PORT || 8080),
  apiPrefix: '/api/v1',
  db: {
    dialect: process.env.DB_DIALECT || process.env.PERSISTENCE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || process.env.LOCAL_DATABASE || 'pagos',
    logging: process.env.DB_LOGGING === 'true',
    sync: process.env.DB_SYNC === 'true'
  },
  jwt: {
    privateKey: process.env.PRIVATE_KEY || process.env.JWT_SECRET || 'development-only-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },
  cors: {
    origins: parseOrigins(process.env.CORS_ORIGINS)
  },
  logging: {
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')
  }
};

if (config.env === 'production' && config.jwt.privateKey === 'development-only-change-me') {
  throw new Error('JWT_SECRET/PRIVATE_KEY es obligatorio en producción.');
}

export default config;
