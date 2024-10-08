const User = require('../models/User');
const db = require('../db');

jest.mock('../db');

describe('User Model', () => {
    it('should create a new user', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password_hash: 'hashed_password',
            full_name: 'Test User'
        };

        db.query.mockResolvedValueOnce({ rows: [userData] });

        const user = await User.createUser(userData);
        expect(user).toEqual(userData);
    });

    it('should get a user by ID', async () => {
        const userId = 1;
        const userData = { user_id: userId, username: 'testuser' };

        db.query.mockResolvedValueOnce({ rows: [userData] });

        const user = await User.getUserById(userId);
        expect(user).toEqual(userData);
    });
});
