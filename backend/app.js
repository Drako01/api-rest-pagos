import express from 'express';
import cors from 'cors';
import config from './src/config/config.js';
import logger from './src/config/logger.js';
import { conectar } from './src/config/Conexion.js';
import { requestContext } from './src/middleware/requestContext.js';
import sessionRouter from './src/routes/session.routes.js';
import pagosRouter from './src/routes/pagos.routes.js';
import userRouter from './src/routes/user.routes.js';

const app = express();

app.disable('x-powered-by');
app.use(requestContext);
app.use(cors({
  origin(origin, callback) {
    if (!origin || config.cors.origins.includes(origin)) return callback(null, true);
    return callback(new Error('Origen no permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

app.get('/health', (req, res) => res.json({
  status: 'ok',
  service: 'payments-api',
  version: '2.0.0',
  timestamp: new Date().toISOString(),
  requestId: req.requestId
}));

app.use(`${config.apiPrefix}/auth`, sessionRouter);
app.use(`${config.apiPrefix}/payments`, pagosRouter);
app.use(`${config.apiPrefix}/users`, userRouter);

// Compatibilidad con los endpoints originales del challenge.
app.use('/', sessionRouter);
app.use('/pagos', pagosRouter);
app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'El recurso solicitado no existe.'
    },
    requestId: req.requestId
  });
});

app.use((err, req, res, next) => {
  logger.error(`request_failed request_id=${req.requestId} ${err.stack || err.message}`);

  const isCorsError = err.message === 'Origen no permitido por CORS';
  res.status(isCorsError ? 403 : 500).json({
    error: {
      code: isCorsError ? 'CORS_DENIED' : 'INTERNAL_ERROR',
      message: isCorsError ? err.message : 'Ocurrió un error interno inesperado.'
    },
    requestId: req.requestId
  });
});

export async function startServer() {
  await conectar();
  return app.listen(config.port, () => {
    logger.info(`Payments API listening on port ${config.port}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    logger.error(`bootstrap_failed ${error.stack || error.message}`);
    process.exit(1);
  });
}

export default app;
