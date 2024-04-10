import request from 'supertest';
import { conectar, desconectar } from '../src/config/Conexion.js';
import app from '../app.js';

describe('API Tests', () => {
    // Prueba para verificar si la ruta de pagos devuelve un código de estado 200
    test('GET /pagos devuelve código de estado 200', async () => {
        const response = await request(app).get('/pagos');
        expect(response.statusCode).toBe(200);
    });

    // Prueba para verificar si la ruta de creación de pagos devuelve un código de estado 201
    test('POST /pagos devuelve código de estado 201', async () => {
        const response = await request(app)
            .post('/pagos')
            .send({
                monto: 100,
                fecha: '2024-04-10',
                tipoPago: 'Efectivo',
                destinatario: 'Juan Perez'
            });
        expect(response.statusCode).toBe(201);
    });    
});

describe('Database Connection Test', () => {
    beforeAll(async () => {
        await conectar(); // Se conecta a la base de datos antes de ejecutar las pruebas
    });

    afterAll(async () => {
        await desconectar(); // Se desconecta de la base de datos después de ejecutar todas las pruebas
    });

    test('Conexión a la base de datos establecida correctamente', () => {
        expect(conectar).not.toThrow(); // Verifica que la función conectar no lance errores
    });
});
