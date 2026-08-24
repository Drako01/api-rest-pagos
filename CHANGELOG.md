# Changelog

Todos los cambios relevantes del proyecto se documentan aquí.

## [2.0.0] — Professional Payments Platform

### Added

- API versionada bajo `/api/v1`;
- healthcheck;
- middleware JWT reutilizable;
- request IDs;
- headers defensivos básicos;
- validación centralizada;
- filtros, búsqueda, ordenamiento y paginación de pagos;
- summary de volumen, promedio y cantidad de operaciones;
- cliente HTTP centralizado en React;
- restauración de sesión mediante `/auth/me`;
- rutas privadas con `ProtectedRoute`;
- dashboard de pagos con KPIs;
- responsive table-to-cards;
- búsqueda con debounce;
- exportación CSV;
- estados loading, error, success y empty;
- `.env.example` para backend y frontend;
- GitHub Actions para backend y frontend;
- documentación de API, arquitectura y seguridad;
- `.gitignore` raíz;
- archivo `LICENSE` canónico.

### Changed

- frontend rediseñado por completo con estética SaaS/fintech;
- login y signup reconstruidos;
- navegación responsive;
- edición de pagos reconstruida;
- vista de usuarios modernizada;
- URL del backend removida de los componentes y externalizada;
- logging backend simplificado y habilitado;
- configuración de entorno centralizada;
- conexión Sequelize endurecida;
- modelos sin `sync()` al importarse;
- endpoints de pagos protegidos;
- responses de usuarios sin passwords;
- scripts backend corregidos (`start` con Node, `dev` con nodemon);
- tests convertidos en contratos determinísticos sin dependencia de PostgreSQL;
- `query.sql` corregido y simplificado;
- README raíz, backend y frontend reescritos.

### Security

- eliminado `backend/.ENV` del árbol activo;
- CORS dejó de aceptar cualquier origen;
- contraseñas nuevas exigen mínimo 8 caracteres;
- bcrypt cost factor elevado para nuevos registros;
- recursos privados requieren Bearer JWT;
- límite de payload configurado;
- política de seguridad documentada.

### Compatibility

Se mantienen aliases para `/login`, `/signup`, `/pagos` y `/users`. Las integraciones nuevas deben utilizar `/api/v1`.

## [1.0.0]

Implementación original del challenge técnico: CRUD de pagos, autenticación JWT básica y frontend React inicial.
