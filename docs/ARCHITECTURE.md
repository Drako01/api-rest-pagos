# Arquitectura — PayFlow

## Objetivo

PayFlow es una aplicación full stack educativa para administrar pagos bancarios sin perder criterios
de ingeniería aplicables a un producto real: separación de responsabilidades, contratos HTTP
explícitos, configuración externa, autenticación, observabilidad básica, tests determinísticos y una
interfaz responsive.

## Vista general

```text
┌──────────────────────────────┐
│          React 19            │
│  routing · auth · dashboard  │
└──────────────┬───────────────┘
               │ HTTPS / JSON
               ▼
┌──────────────────────────────┐
│       Express REST API       │
│ auth · validation · filters  │
│ errors · request context     │
└──────────────┬───────────────┘
               │ Sequelize
               ▼
┌──────────────────────────────┐
│          PostgreSQL          │
│ users · payments             │
└──────────────────────────────┘
```

## Backend

### Bootstrap

`backend/app.js` funciona como composition root:

1. crea Express;
2. configura request context y headers defensivos;
3. aplica CORS configurable;
4. configura parsers con límite de payload;
5. monta healthcheck;
6. monta `/api/v1/auth`, `/api/v1/payments` y `/api/v1/users`;
7. conserva aliases históricos;
8. normaliza 404 y errores inesperados;
9. conecta PostgreSQL sólo al iniciar el proceso servidor.

El módulo exporta `app`, por lo que Supertest puede verificar contratos sin abrir un puerto ni necesitar
una base para rutas que no la utilizan.

### Capas

- `config/`: configuración externa, Sequelize y logging.
- `controllers/`: orquestación HTTP y casos de uso simples.
- `middleware/`: autenticación y contexto transversal de request.
- `models/`: entidades Sequelize.
- `routes/`: definición declarativa del surface HTTP.
- `utils/`: validadores y utilidades puras.
- `test/`: contract/smoke tests.

### Autenticación

El cliente envía JWT por `Authorization: Bearer <token>`. El middleware `requireAuth` verifica firma y
expiración antes de permitir acceso a recursos privados.

Las contraseñas:

- nunca se devuelven desde endpoints de usuarios;
- se hashean con bcrypt antes de persistir;
- requieren mínimo 8 caracteres para nuevas cuentas.

### Persistencia

Sequelize centraliza la conexión. Los modelos ya no ejecutan `sync()` como efecto colateral al
importarse. El sync de desarrollo es explícito mediante `DB_SYNC=true`.

Esto permite distinguir entre:

- entorno local/demo: `DB_SYNC=true`;
- producción: `DB_SYNC=false` y evolución del esquema mediante migraciones controladas.

## Frontend

### Composition root

`App.jsx` monta:

- `AuthProvider`;
- `BrowserRouter`;
- header responsive;
- router de páginas;
- footer.

### API client

`src/services/api.js` es el único lugar que conoce:

- `VITE_API_URL`;
- token JWT;
- headers HTTP;
- parsing de respuestas;
- estructura de errores.

Los componentes consumen métodos semánticos como `api.payments()`, `api.login()` o
`api.updatePayment()` y no repiten `fetch()` ni URLs hardcodeadas.

### Estado de autenticación

`AuthContext`:

1. lee la sesión persistida;
2. si existe token, consulta `/auth/me`;
3. elimina automáticamente una sesión inválida/expirada;
4. expone `authenticated`, `userProfile`, `loading`, `signIn` y `signOut`.

`ProtectedRoute` evita renderizar páginas privadas sin una sesión válida.

### Dashboard de pagos

El dashboard ofrece:

- KPIs derivados desde el backend;
- búsqueda con debounce;
- filtro por medio de pago;
- rango de fechas;
- ordenamiento;
- paginación;
- alta de pago;
- edición;
- eliminación con confirmación;
- exportación CSV compatible con Excel;
- estados loading/empty/error/success;
- tabla que se transforma en cards semánticas en mobile.

## Responsive design

El frontend usa un design system CSS propio con:

- variables de color, radios, sombras y spacing;
- shell fluido;
- Grid/Flexbox;
- navegación mobile;
- layouts adaptativos;
- tabla responsive sin scroll obligatorio en celulares;
- inputs y botones con superficies táctiles adecuadas;
- tipografía fluida mediante `clamp()`.

Breakpoints principales:

- `1040px`: grids intermedios;
- `860px`: navegación mobile y layouts verticales;
- `720px`: tabla → cards;
- `560px`: experiencia mobile compacta.

## Seguridad aplicada

Este proyecto no pretende reemplazar una plataforma bancaria certificada. Sí implementa controles
razonables para el alcance:

- configuración sensible fuera del repositorio;
- JWT con expiración;
- bcrypt;
- CORS por allowlist;
- límites de payload;
- headers defensivos básicos;
- validación backend;
- no exposición de hashes;
- códigos de error no ambiguos;
- `X-Request-Id` para correlación;
- recursos de pagos protegidos.

Para un entorno financiero real se sumarían, entre otros: RBAC, refresh token rotation, MFA, rate
limiting distribuido, audit trail inmutable, idempotency keys, cifrado de campos sensibles, secret
manager, migraciones, SIEM, políticas antifraude y controles regulatorios.

## CI

GitHub Actions ejecuta dos jobs independientes:

### Backend

```text
npm ci
npm test
```

### Frontend

```text
npm ci
npm test
npm run build
```

Un cambio no debería mergearse si rompe el contrato básico de la API o si React deja de compilar.

## Evolución recomendada

Siguientes pasos naturales si el proyecto continúa creciendo:

1. migraciones Sequelize;
2. ownership de pagos por usuario/tenant;
3. RBAC;
4. refresh tokens;
5. auditoría de acciones;
6. idempotency keys para POST;
7. OpenAPI 3.1;
8. Docker Compose para API + PostgreSQL;
9. integración E2E;
10. observabilidad con métricas y tracing.
