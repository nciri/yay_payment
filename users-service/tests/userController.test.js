const userController = require('../controllers/userController');
const User = require('../models/User');

jest.mock('../models/User');

describe('User Controller', () => {
    it('should create a new user', async () => {
        const req = {
            body: {
                username: 'testuser',
                email: 'test@example.com',
                password_hash: 'hashed_password',
                full_name: 'Test User'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        User.createUser.mockResolvedValueOnce(req.body);

        await userController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return a user by ID', async () => {
        const req = { params: { id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const userData = { user_id: 1, username: 'testuser' };

        User.getUserById.mockResolvedValueOnce(userData);

        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userData);
    });
});
