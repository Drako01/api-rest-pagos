# PayFlow Frontend

Frontend React de PayFlow.

## Stack

- React 18
- React Router 6
- Context API
- CSS responsive propio
- Fetch API mediante cliente centralizado

## Inicio rápido

```bash
npm ci
cp .env.example .env
npm start
```

Variable requerida:

```dotenv
REACT_APP_API_URL=http://localhost:8080/api/v1
```

## Arquitectura

```text
src/
├── components/
│   ├── Header/
│   ├── Navbar/
│   ├── Index/
│   ├── Login/
│   ├── SignUp/
│   ├── Pagos/
│   ├── DetallePago/
│   └── Users/
├── context/
│   └── AuthContext.js
├── services/
│   └── api.js
├── App.js
├── App.css
└── index.css
```

## Cliente HTTP

Toda comunicación con el backend pasa por `src/services/api.js`.

Esto evita:

- URLs hardcodeadas en componentes;
- repetición de Bearer token;
- repetición de parsing JSON;
- manejo inconsistente de errores.

## Auth

`AuthContext` valida la sesión existente contra `/auth/me`. Las páginas privadas usan `ProtectedRoute`.

## Dashboard

La pantalla de pagos incluye:

- KPIs;
- alta;
- búsqueda con debounce;
- filtros;
- ordenamiento;
- paginación;
- edición;
- eliminación;
- exportación CSV;
- loading/error/empty states.

## Responsive

El diseño es mobile-first en comportamiento aunque mantenga una composición desktop amplia.

A partir de `720px`, la tabla se transforma en cards con labels por fila. La navegación también cambia a menú colapsable en pantallas angostas.

## Testing y build

```bash
npm test -- --watchAll=false
npm run build
```

Ambos comandos se ejecutan en CI.

## Autor

**Alejandro Daniel Di Stefano** — [@Drako01](https://github.com/Drako01)
