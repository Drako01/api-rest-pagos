# Security Policy

## Alcance

PayFlow es un proyecto educativo/técnico. Implementa controles de seguridad acordes a una aplicación demostrativa, pero **no está certificado para procesar dinero real, información bancaria sensible ni datos regulados**.

## Versiones soportadas

La rama `main` representa la única versión mantenida activamente.

## Reporte responsable

Si encontrás una vulnerabilidad, evitá publicar secretos, credenciales o payloads explotables en un Issue público. Contactá al mantenedor mediante su perfil de GitHub para coordinar una divulgación responsable.

## Controles implementados

- JWT firmado y con expiración.
- Middleware de autenticación Bearer.
- Hash de passwords con bcrypt.
- Passwords excluidos de respuestas de usuario.
- Validación server-side de auth y pagos.
- Allowlist configurable para CORS.
- Límite de tamaño para JSON/forms.
- Headers defensivos básicos.
- Secretos y `.env` excluidos de Git.
- `X-Request-Id` para correlación de eventos.
- Errores internos no expuestos directamente al cliente.
- CI para verificar contratos básicos y build.

## Controles necesarios antes de un uso financiero real

Entre otros:

1. MFA y políticas de autenticación reforzadas.
2. Refresh token rotation y revocación.
3. RBAC/ABAC y principio de mínimo privilegio.
4. Ownership/tenant isolation de cada pago.
5. Idempotency keys para creación de operaciones.
6. Audit log inmutable.
7. Rate limiting distribuido y protección anti-abuso.
8. Gestión de secretos mediante un secret manager.
9. TLS obligatorio y hardening de infraestructura.
10. Cifrado de datos sensibles en reposo.
11. Migraciones versionadas y backups verificados.
12. SAST, dependency scanning y secret scanning.
13. Métricas, tracing y alertas SIEM.
14. Threat modeling formal y pentesting.
15. Controles regulatorios aplicables al contexto de despliegue.

## Secretos históricos

El upgrade profesional elimina del árbol activo el archivo `backend/.ENV` que estaba versionado. Si ese archivo histórico contuvo credenciales reales, deben considerarse comprometidas y rotarse, ya que eliminar el archivo de una rama nueva no borra el contenido del historial Git existente.
