<div align="center">

# PayFlow — Payments Management Platform

**Aplicación full stack para gestión de pagos, construida como proyecto de ingeniería de software y
no sólo como un CRUD.**

React 19 · Vite 8 · Node.js 24 LTS · Express 5 · PostgreSQL · Sequelize · JWT

**Autor:** [Alejandro Daniel Di Stefano](https://github.com/Drako01)

</div>

---

## ¿Qué es PayFlow?

Este repositorio nació como un challenge técnico para gestionar pagos bancarios. La versión actual
lleva esa idea a una implementación mucho más completa: una **plataforma de operaciones de pagos**
con API REST versionada, autenticación, validaciones, filtros, paginación, métricas, observabilidad
básica, CI y un frontend responsive con experiencia de dashboard.

El objetivo del proyecto es doble:

1. resolver correctamente el caso de uso de pagos;
2. servir como referencia educativa de cómo evolucionar un prototipo hacia una aplicación mantenible
   y presentable profesionalmente.

## Principales capacidades

### Payments dashboard

- alta de pagos;
- consulta paginada;
- edición;
- eliminación con confirmación;
- búsqueda por destinatario o tipo;
- filtro por tipo de pago;
- rango de fechas;
- ordenamiento configurable;
- métricas de volumen total, ticket promedio y cantidad de movimientos;
- exportación CSV compatible con Excel;
- estados de loading, error y empty state;
- UI totalmente responsive.

### Autenticación

- creación de cuenta;
- login;
- JWT con expiración;
- restauración y validación de sesión mediante `/auth/me`;
- rutas React protegidas;
- recursos de pagos protegidos por Bearer token;
- contraseñas hasheadas con bcrypt;
- respuestas que nunca exponen el hash del password.

### REST API

- prefijo versionado `/api/v1`;
- contratos JSON consistentes;
- validación centralizada;
- paginación;
- filtros compuestos;
- ordenamiento;
- summary de resultados;
- healthcheck;
- `X-Request-Id` para correlación;
- manejo centralizado de 404 y errores inesperados;
- aliases de compatibilidad para los endpoints originales.

### Engineering / DX

- configuración por variables de entorno;
- `.env.example` para backend y frontend;
- archivo sensible `.ENV` removido del repositorio;
- CORS por allowlist;
- payload size limits;
- headers defensivos básicos;
- logging estructurado;
- Sequelize sin `sync()` oculto al importar modelos;
- tests de contrato que no requieren PostgreSQL para ejecutarse;
- GitHub Actions para backend y frontend;
- documentación de arquitectura y API.

## Frontend

El frontend fue rediseñado completamente con una estética de producto financiero/SaaS.

Incluye:

- landing de producto;
- navbar sticky con menú mobile;
- login y signup dedicados;
- dashboard con KPIs;
- panel de filtros;
- formulario de alta integrado;
- tabla desktop que se transforma en cards en mobile;
- edición de pagos;
- gestión visual de usuarios;
- sistema de diseño CSS propio con tokens;
- accesibilidad básica en labels, estados, navegación y botones.

### Responsive

La interfaz se adapta específicamente en cuatro niveles:

- desktop amplio;
- notebook/tablet landscape;
- tablet/mobile;
- mobile compacto.

La tabla de pagos no depende únicamente de scroll horizontal: en pantallas pequeñas se renderiza
visualmente como una lista de cards con `data-label`, conservando toda la información y acciones.

## Arquitectura

```text
┌───────────────────────────────────┐
│             React 19              │
│ Router · Auth Context · Dashboard │
└─────────────────┬─────────────────┘
                  │ JSON / Bearer JWT
                  ▼
┌───────────────────────────────────┐
│          Express REST API         │
│ Auth · Validation · Query · Logs  │
└─────────────────┬─────────────────┘
                  │ Sequelize
                  ▼
┌───────────────────────────────────┐
│            PostgreSQL             │
│        Usuarios · Pagos           │
└───────────────────────────────────┘
```

Más detalle: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Estructura del repositorio

```text
api-rest-pagos/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── test/
│   ├── .env.example
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
│   └── .env.example
├── docs/
│   ├── API.md
│   └── ARCHITECTURE.md
├── query.sql
└── README.md
```

## Requisitos

Recomendado:

- Node.js 24.15+
- npm 11+
- PostgreSQL 14+

## Puesta en marcha

### 1. Clonar

```bash
git clone https://github.com/Drako01/api-rest-pagos.git
cd api-rest-pagos
```

### 2. PostgreSQL

Crear una base de datos para el proyecto, por ejemplo:

```sql
CREATE DATABASE pagos;
```

### 3. Backend

```bash
cd backend
npm ci
cp .env.example .env
```

Configurar `.env`:

```dotenv
NODE_ENV=development
PORT=8080

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=change-me
DB_NAME=pagos
DB_SYNC=true

JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1h
CORS_ORIGINS=http://localhost:3000
LOG_LEVEL=debug
```

Luego:

```bash
npm run dev
```

API:

```text
http://localhost:8080
```

Healthcheck:

```text
GET http://localhost:8080/health
```

> `DB_SYNC=true` está pensado para levantar el proyecto localmente. En un entorno productivo se
> recomienda `DB_SYNC=false` y migraciones versionadas.

### 4. Frontend

En otra terminal:

```bash
cd frontend
npm ci
cp .env.example .env
npm start
```

Frontend:

```text
http://localhost:3000
```

Variable principal:

```dotenv
VITE_API_URL=http://localhost:8080/api/v1
```

Ya no existen URLs de API hardcodeadas dentro de los componentes React.

## Scripts

### Backend

```bash
npm run dev       # watch mode nativo de Node.js
npm start         # runtime normal con node
npm test          # test suite
npm run test:watch
```

### Frontend

```bash
npm start
npm test
npm run build
```

## API rápida

Base URL:

```text
/api/v1
```

### Auth

```text
POST /api/v1/auth/signup
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

### Payments

```text
GET    /api/v1/payments
POST   /api/v1/payments
GET    /api/v1/payments/:id
PUT    /api/v1/payments/:id
DELETE /api/v1/payments/:id
```

### Users

```text
GET /api/v1/users
```

Documentación completa: [`docs/API.md`](docs/API.md).

## Ejemplo: login

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"operator@example.com","password":"a-secure-password"}'
```

## Ejemplo: consultar pagos

```bash
curl "http://localhost:8080/api/v1/payments?page=1&limit=10&sortBy=fecha&order=desc" \
  -H "Authorization: Bearer <token>"
```

## Filtros disponibles

`GET /api/v1/payments` acepta:

- `page`
- `limit`
- `search`
- `tipoPago`
- `dateFrom`
- `dateTo`
- `minAmount`
- `maxAmount`
- `sortBy`
- `order`

La respuesta incluye tanto datos paginados como metadata y resumen monetario.

## Seguridad

Controles implementados dentro del alcance del proyecto:

- JWT firmado y con expiración;
- bcrypt;
- CORS por orígenes configurados;
- validación backend;
- límites de payload;
- protección de endpoints privados;
- no exposición de contraseñas;
- secretos fuera del repositorio;
- request IDs;
- headers defensivos básicos;
- errores internos no detallados al consumidor.

Este repositorio es un proyecto educativo/técnico y **no debe interpretarse como una plataforma
certificada para procesamiento financiero real**. La arquitectura documenta qué controles adicionales
serían necesarios para un entorno regulado.

## CI

Cada push a `main` y cada PR contra `main` ejecuta GitHub Actions.

Backend:

```text
npm ci → npm test
```

Frontend:

```text
npm ci → tests → production build
```

## Decisiones relevantes del upgrade

### Se mantuvo PostgreSQL + Sequelize

El objetivo era evolucionar el proyecto, no reemplazar arbitrariamente su stack.

### Se conservan endpoints legacy

Los paths históricos siguen montados como aliases. Las integraciones nuevas deben usar `/api/v1`.

### No se agregó una librería UI pesada

El diseño responsive usa un sistema CSS propio para mantener el frontend legible y educativo.

### La URL del backend dejó de estar hardcodeada

Todas las llamadas pasan por `src/services/api.js` y `VITE_API_URL`.

### El frontend usa Vite

Create React App fue reemplazado por Vite para mantener compatibilidad con Node.js 24 y tooling vigente.

### Los modelos dejaron de sincronizar la DB al importarse

La inicialización del esquema local ahora es una decisión explícita con `DB_SYNC=true`.

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md)
- [REST API](docs/API.md)
- [Backend](backend/README.md)
- [Frontend](frontend/README.md)

## Licencia

El repositorio mantiene la licencia incluida en [`LICENCE`](LICENCE).

## Autor

**Alejandro Daniel Di Stefano**

GitHub: [@Drako01](https://github.com/Drako01)

---

Este repositorio está mantenido como proyecto práctico de referencia sobre React, Node.js, APIs REST,
autenticación, PostgreSQL y evolución de software desde un challenge técnico hacia una solución más
profesional.
