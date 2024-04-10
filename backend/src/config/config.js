import dotenv from 'dotenv'
dotenv.config()

export default {
    // Variables de entorno:
    app: {
        persistence: process.env.PERSISTENCE
    },
    ports: {
        prodPort: process.env.PROD_PORT || 3000,
        devPort: process.env.DEV_PORT
    },
    db: {
        local_connection: process.env.LOCAL_CONNECTION,
        local_database: process.env.LOCAL_DATABASE,
        mongo_connection: process.env.MONGO_CONNECTION,
        mongo_database: process.env.MONGO_DATABASE,
        secret: process.env.SECRET
    },
    jwt: {
        privateKey: process.env.PRIVATE_KEY,
        cookieName: process.env.JWT_COOKIE_NAME
    },
    urls: {
        urlLocal: process.env.URL_LOCAL,
        urlProd: process.env.URL_PROD
    },
    log: {
        level: process.env.ENVIROMENT
    },
    db_conexion: {
        dialect: process.env.PERSISTENCE,
        host: 'localhost',
        port: process.env.PORT || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.LOCAL_DATABASE
    }
}