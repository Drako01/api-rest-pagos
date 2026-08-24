import request from 'supertest';
import app from '../app.js';
import { validateCredentials, validatePayment } from '../src/utils/validation.js';

describe('Payments API contract', () => {
  test('GET /health exposes service health', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.service).toBe('payments-api');
    expect(response.headers['x-request-id']).toBeDefined();
  });

  test('GET /api/v1/payments requires authentication', async () => {
    const response = await request(app).get('/api/v1/payments');

    expect(response.statusCode).toBe(401);
    expect(response.body.error.code).toBe('AUTH_REQUIRED');
  });

  test('unknown routes return a normalized error', async () => {
    const response = await request(app).get('/api/v1/unknown-resource');

    expect(response.statusCode).toBe(404);
    expect(response.body.error.code).toBe('ROUTE_NOT_FOUND');
  });
});

describe('Validation', () => {
  test('rejects malformed signup credentials', () => {
    const result = validateCredentials(
      { email: 'invalid', password: '123' },
      { strongPassword: true }
    );

    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.password).toBeDefined();
  });

  test('keeps login validation compatible with existing passwords', () => {
    const result = validateCredentials({ email: 'legacy@example.com', password: '123' });

    expect(result.valid).toBe(true);
  });

  test('accepts a valid payment payload', () => {
    const result = validatePayment({
      monto: '1250.50',
      fecha: '2026-08-23',
      tipoPago: 'Transferencia',
      destinatario: 'Proveedor Demo'
    });

    expect(result.valid).toBe(true);
    expect(result.value.monto).toBe(1250.5);
  });
});
