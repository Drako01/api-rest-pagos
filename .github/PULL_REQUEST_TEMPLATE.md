# Pull request

## Resumen

<!-- Explicar en 2 o 3 lineas que cambia este PR y por que. -->

- <!-- Completar. -->

## Contexto

Ticket, issue, conversacion o motivo del cambio:

- <!-- Completar. -->

Problema que resuelve:

- <!-- Completar. -->

## Tipo de cambio

- [ ] Bugfix
- [ ] Feature
- [ ] Refactor
- [ ] UI/UX
- [ ] Performance
- [ ] Seguridad
- [ ] Infraestructura o deploy
- [ ] Documentacion
- [ ] Tests
- [ ] Mantenimiento

## Alcance

Que cambia este PR:

- <!-- Completar. -->

Que queda fuera de este PR:

- <!-- Completar. -->

## Impacto funcional

Flujos o pantallas afectadas:

- <!-- Completar. -->

Usuarios, roles o permisos afectados:

- [ ] Publico
- [ ] Usuario autenticado
- [ ] Admin/backoffice
- [ ] Superadmin
- [ ] No aplica

Compatibilidad hacia atras:

- [ ] Mantiene comportamiento existente
- [ ] Cambia comportamiento existente
- [ ] Requiere comunicacion o coordinacion externa

Notas:

- <!-- Completar. -->

## Validacion realizada

Checks automaticos:

- [ ] `pnpm run type-check`
- [ ] `pnpm run build`
- [ ] `pnpm run lint`
- [ ] `pnpm run lint:backend`
- [ ] `pnpm run test`
- [ ] `pnpm run test:backend:smoke`
- [ ] `pnpm run ci:a11y`
- [ ] `pnpm run ci:seo`
- [ ] No aplica

Pruebas manuales:

- [ ] Prueba manual en local
- [ ] Prueba manual en entorno similar a produccion
- [ ] Prueba de flujo feliz
- [ ] Prueba de errores/validaciones
- [ ] Prueba responsive
- [ ] No aplica

Detalle de pruebas, navegadores, rutas, usuarios o datos usados:

- <!-- Completar. -->

## Evidencia visual

Capturas o video antes/despues, si corresponde:

- <!-- Completar. -->

## Backend, datos y contratos

- [ ] No modifica backend
- [ ] No modifica base de datos
- [ ] No modifica contratos de API
- [ ] Agrega o modifica endpoints
- [ ] Agrega o modifica migraciones
- [ ] Agrega o modifica seeds/datos iniciales
- [ ] Actualiza documentacion de API o contrato cuando aplica

Notas de backend, datos o contratos:

- <!-- Completar. -->

## Variables, secretos y configuracion

- [ ] No requiere nuevas variables de entorno
- [ ] Requiere nuevas variables de entorno
- [ ] No modifica secretos ni credenciales
- [ ] No commitea archivos `.env`
- [ ] Documenta valores requeridos para deploy

Variables nuevas o modificadas:

- <!-- Completar. -->

## Seguridad y privacidad

- [ ] No afecta autenticacion/autorizacion
- [ ] Verifique permisos y controles de acceso
- [ ] Verifique validacion de inputs
- [ ] Verifique manejo de datos sensibles
- [ ] No expone secretos, tokens ni datos personales
- [ ] No aplica

Notas:

- <!-- Completar. -->

## Backoffice

- [ ] No modifica backoffice
- [ ] Verifique permisos, formularios, estados vacios y mensajes de error
- [ ] Verifique acciones destructivas con confirmacion
- [ ] Verifique persistencia, filtros, paginacion o navegacion cuando aplica

Detalle:

- <!-- Completar. -->

## Media y archivos

- [ ] No modifica imagenes ni archivos subidos
- [ ] No borra ni reemplaza archivos existentes en `public/img`
- [ ] Mantiene intactas las imagenes administradas desde el servidor
- [ ] Verifique rutas nuevas o modificadas

Detalle:

- <!-- Completar. -->

## Performance, accesibilidad y SEO

- [ ] No afecta performance
- [ ] No afecta accesibilidad
- [ ] No afecta SEO
- [ ] Verifique carga inicial o bundle cuando aplica
- [ ] Verifique navegacion por teclado, foco y labels cuando aplica
- [ ] Verifique metadata, canonical, robots o sitemap cuando aplica

Notas:

- <!-- Completar. -->

## Deploy

- [ ] Compatible con export estatico de Next.js
- [ ] Compatible con DonWeb o hosting compartido
- [ ] No requiere migraciones
- [ ] Requiere migraciones
- [ ] No requiere cambios de variables de entorno
- [ ] Requiere cambios de variables de entorno
- [ ] No requiere pasos manuales post-deploy
- [ ] Requiere pasos manuales post-deploy

Notas de deploy, migraciones, variables o pasos manuales:

- <!-- Completar. -->

## Riesgos y rollback

Riesgos conocidos:

- <!-- Completar. -->

Plan de rollback:

- <!-- Completar. -->

## Guia para reviewer

Puntos donde conviene mirar con mas atencion:

- <!-- Completar. -->

Preguntas abiertas o decisiones pendientes:

- <!-- Completar. -->

## Checklist final

- [ ] Revise el diff completo antes de pedir review
- [ ] No quedan logs, datos de prueba ni comentarios temporales
- [ ] No se commitearon secretos ni archivos `.env`
- [ ] Los textos visibles estan revisados
- [ ] Las rutas criticas siguen funcionando
- [ ] La evidencia de validacion esta completa
- [ ] El PR esta listo para review
