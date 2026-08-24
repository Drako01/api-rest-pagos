import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import request from 'supertest';

process.env.NODE_ENV = 'test';

const { default: app } = await import('../app.js');
const { validateCredentials, validatePayment } = await import('../src/utils/validation.js');

describe('Payments API contract', () => {
  test('GET /health exposes service health', async () => {
    const response = await request(app).get('/health');

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.status, 'ok');
    assert.equal(response.body.service, 'payments-api');
    assert.ok(response.headers['x-request-id']);
  });

  test('GET /api/v1/payments requires authentication', async () => {
    const response = await request(app).get('/api/v1/payments');

    assert.equal(response.statusCode, 401);
    assert.equal(response.body.error.code, 'AUTH_REQUIRED');
  });

  test('unknown routes return a normalized error', async () => {
    const response = await request(app).get('/api/v1/unknown-resource');

    assert.equal(response.statusCode, 404);
    assert.equal(response.body.error.code, 'ROUTE_NOT_FOUND');
  });
});

describe('Validation', () => {
  test('rejects malformed signup credentials', () => {
    const result = validateCredentials(
      { email: 'invalid', password: '123' },
      { strongPassword: true }
    );

    assert.equal(result.valid, false);
    assert.ok(result.errors.email);
    assert.ok(result.errors.password);
  });

  test('keeps login validation compatible with existing passwords', () => {
    const result = validateCredentials({ email: 'legacy@example.com', password: '123' });

    assert.equal(result.valid, true);
  });

  test('accepts a valid payment payload', () => {
    const result = validatePayment({
      monto: '1250.50',
      fecha: '2026-08-23',
      tipoPago: 'Transferencia',
      destinatario: 'Proveedor Demo'
    });

    assert.equal(result.valid, true);
    assert.equal(result.value.monto, 1250.5);
  });
});
