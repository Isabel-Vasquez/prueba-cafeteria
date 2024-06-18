const request = require('supertest');
const server = require('../index');

describe('Operaciones CRUD de cafes', () => {
	describe('GET /cafes', () => {
		it('debería devolver un status code 200 y un arreglo con al menos un objeto', async () => {
			const response = await request(server).get('/cafes');
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body.length).toBeGreaterThan(0);
		});
	});

	describe('DELETE /cafes/:id', () => {
		it('debería devolver un código 404 si el ID no existe', async () => {
			const response = await request(server)
				.delete('/cafes/999')
				.set('Authorization', 'someToken');
			expect(response.status).toBe(404);
		});
	});

	describe('POST /cafes', () => {
		it('debería agregar un nuevo café y devolver un código 201', async () => {
			const nuevoCafe = { id: 5, nombre: 'Latte' };
			const response = await request(server).post('/cafes').send(nuevoCafe);
			expect(response.status).toBe(201);
			expect(response.body).toContainEqual(nuevoCafe);
		});
	});

	describe('PUT /cafes/:id', () => {
		it('debería devolver un código 400 si los IDs no coinciden', async () => {
			const cafeActualizado = { id: 5, nombre: 'Latte' };
			const response = await request(server)
				.put('/cafes/3')
				.send(cafeActualizado);
			expect(response.status).toBe(400);
		});
	});
});
