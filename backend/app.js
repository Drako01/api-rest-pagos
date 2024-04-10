import express from 'express';
import cors from 'cors';
import loggers from './src/config/logger.js';
import config from './src/config/config.js';
import userRouter from './src/routes/user.routes.js';
import { conectar } from './src/config/Conexion.js';
import sessionRouter from './src/routes/session.routes.js';
import pagosRouter from './src/routes/pagos.routes.js';

const app = express();

// Configuración de JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
app.use(cors());

// Rutas
app.use('/', userRouter);
app.use('/', sessionRouter);
app.use('/pagos', pagosRouter);
// Manejador de errores global
app.use((err, req, res, next) => {
    loggers.error(`Error en la solicitud: ${err.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Configuración del servidor
const dominio = config.urls.urlLocal;
const PORT = config.ports.prodPort;
const upServer = `Server Up! => ${dominio}:${PORT}`;

// Inicialización del servidor
async function startServer() {
    try {
        loggers.debug('Iniciando el servidor...');
        await conectar();
        const httpServer = app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
            console.log(`Accede a través de: ${upServer}`);
        });
    } catch (error) {
        loggers.error(`Error al conectar a la base de datos: ${error.message}`);
        process.exit(1);
    }
}

startServer();

export default app;