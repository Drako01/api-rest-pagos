# PayFlow Backend

API REST de la plataforma PayFlow.

## Stack

- Node.js
- Express
- PostgreSQL
- Sequelize
- JWT
- bcrypt
- Winston
- Jest + Supertest

## Inicio rápido

```bash
npm ci
cp .env.example .env
npm run dev
```

Servidor por defecto:

```text
http://localhost:8080
```

Healthcheck:

```text
GET /health
```

## Variables de entorno

```dotenv
NODE_ENV=development
PORT=8080
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=change-me
DB_NAME=pagos
DB_LOGGING=false
DB_SYNC=true
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1h
CORS_ORIGINS=http://localhost:3000
LOG_LEVEL=debug
```

`DB_SYNC=true` es una comodidad para desarrollo. En producción se recomienda `DB_SYNC=false` y migraciones explícitas.

## Arquitectura

```text
app.js
└── src/
    ├── config/       configuración, Sequelize y logger
    ├── controllers/  handlers HTTP
    ├── middleware/   auth y request context
    ├── models/       modelos Sequelize
    ├── routes/       surface REST
    └── utils/        validación pura
```

## API v1

```text
POST /api/v1/auth/signup
POST /api/v1/auth/login
GET  /api/v1/auth/me

GET    /api/v1/payments
POST   /api/v1/payments
GET    /api/v1/payments/:id
PUT    /api/v1/payments/:id
DELETE /api/v1/payments/:id

GET /api/v1/users
```

Detalle de contratos: [`../docs/API.md`](../docs/API.md).

## Testing

```bash
npm test
```

Los tests base están diseñados para validar healthcheck, auth boundary, errores y validadores sin depender de una instancia PostgreSQL en CI.

## Seguridad

- JWT Bearer obligatorio para pagos y usuarios.
- bcrypt para passwords.
- CORS configurable.
- límite de payload JSON.
- validación server-side.
- errores normalizados.
- hashes de contraseña excluidos de respuestas.
- `X-Request-Id` para trazabilidad.
- variables sensibles fuera de Git.

## Autor

**Alejandro Daniel Di Stefano** — [@Drako01](https://github.com/Drako01)
