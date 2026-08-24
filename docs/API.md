# API REST — PayFlow

La API pública del proyecto se expone bajo el prefijo `/api/v1`.

## Convenciones

- Formato: JSON.
- Autenticación: `Authorization: Bearer <token>`.
- Fechas: ISO 8601.
- Montos: decimal positivo.
- Errores: objeto `error` con `code`, `message` y, cuando corresponde, `fields`.
- Trazabilidad: cada respuesta incluye el header `X-Request-Id`.

## Healthcheck

### `GET /health`

No requiere autenticación.

```json
{
  "status": "ok",
  "service": "payments-api",
  "version": "2.0.0",
  "timestamp": "2026-08-23T00:00:00.000Z",
  "requestId": "..."
}
```

## Autenticación

### `POST /api/v1/auth/signup`

```json
{
  "email": "operator@example.com",
  "password": "a-secure-password"
}
```

Respuesta `201`:

```json
{
  "token": "<jwt>",
  "user": {
    "id": 1,
    "email": "operator@example.com",
    "createdAt": "..."
  }
}
```

La contraseña nueva debe tener al menos 8 caracteres y se persiste mediante hash bcrypt.

### `POST /api/v1/auth/login`

Acepta `email` y `password`. Devuelve el mismo contrato `{ token, user }` que signup.

### `GET /api/v1/auth/me`

Requiere JWT y devuelve el usuario asociado a la sesión.

## Pagos

Todos los endpoints de pagos requieren autenticación.

### `GET /api/v1/payments`

Lista pagos con paginación, búsqueda, filtros y ordenamiento.

Parámetros disponibles:

| Parámetro | Descripción | Default |
| --- | --- | --- |
| `page` | Página solicitada | `1` |
| `limit` | Registros por página, máximo 100 | `10` |
| `search` | Busca en destinatario y tipo de pago | vacío |
| `tipoPago` | Coincidencia exacta por tipo | vacío |
| `dateFrom` | Fecha mínima | vacío |
| `dateTo` | Fecha máxima | vacío |
| `minAmount` | Monto mínimo | vacío |
| `maxAmount` | Monto máximo | vacío |
| `sortBy` | `fecha`, `monto`, `destinatario`, `tipoPago`, `createdAt` | `fecha` |
| `order` | `asc` o `desc` | `desc` |

Ejemplo:

```text
GET /api/v1/payments?search=proveedor&dateFrom=2026-08-01&sortBy=monto&order=desc&page=1&limit=20
```

Respuesta:

```json
{
  "data": [
    {
      "id": 21,
      "monto": "25000.00",
      "fecha": "2026-08-20T00:00:00.000Z",
      "tipoPago": "Transferencia Bancaria",
      "destinatario": "Proveedor Demo"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1,
    "sortBy": "monto",
    "order": "desc"
  },
  "summary": {
    "totalAmount": 25000,
    "averageAmount": 25000,
    "records": 1
  }
}
```

### `POST /api/v1/payments`

```json
{
  "monto": 12500.50,
  "fecha": "2026-08-23",
  "tipoPago": "Transferencia Bancaria",
  "destinatario": "Proveedor Demo"
}
```

Respuesta `201`:

```json
{
  "data": {
    "id": 22,
    "monto": "12500.50",
    "fecha": "...",
    "tipoPago": "Transferencia Bancaria",
    "destinatario": "Proveedor Demo"
  }
}
```

### `GET /api/v1/payments/:id`

Devuelve `{ "data": payment }` o `404 PAYMENT_NOT_FOUND`.

### `PUT /api/v1/payments/:id`

Actualización completa del pago. Usa el mismo contrato y validaciones que `POST`.

### `DELETE /api/v1/payments/:id`

Devuelve `204 No Content` cuando la eliminación es exitosa.

## Usuarios

### `GET /api/v1/users`

Requiere autenticación. Expone únicamente información pública del usuario; nunca devuelve hashes de contraseña.

```json
{
  "data": [
    {
      "id": 1,
      "email": "operator@example.com",
      "createdAt": "..."
    }
  ]
}
```

## Contrato de error

Ejemplo de validación:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El pago contiene datos inválidos.",
    "fields": {
      "monto": "El monto debe ser mayor a 0 y respetar el límite admitido."
    }
  }
}
```

Códigos relevantes:

- `AUTH_REQUIRED`
- `INVALID_TOKEN`
- `INVALID_CREDENTIALS`
- `EMAIL_ALREADY_EXISTS`
- `VALIDATION_ERROR`
- `PAYMENT_NOT_FOUND`
- `ROUTE_NOT_FOUND`
- `CORS_DENIED`
- `INTERNAL_ERROR`

## Compatibilidad

Los paths históricos `/login`, `/signup`, `/pagos` y `/users` continúan montados como alias de compatibilidad. Para cualquier integración nueva se debe utilizar `/api/v1`.
