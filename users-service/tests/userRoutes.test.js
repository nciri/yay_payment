const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/Routes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
    it('should get a user by ID', async () => {
        const mockUser = { user_id: 1, username: 'testuser', email: 'test@example.com' };

        // Simuler la réponse de la base de données
        jest.spyOn(require('../models/User'), 'getUserById').mockResolvedValue(mockUser);

        const response = await request(app).get('/api/users/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });
});
