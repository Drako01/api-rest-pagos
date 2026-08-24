-- PayFlow local database bootstrap
-- Execute this statement while connected to a PostgreSQL server with permission
-- to create databases. Sequelize can create the application tables afterwards
-- when DB_SYNC=true in backend/.env.

CREATE DATABASE pagos
    WITH
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
