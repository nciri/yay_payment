const User = require('../models/User');

const userController = {
    createUser: async (req, res) => {
        try {
            const { username, email, password, full_name } = req.body; // Récupérez le mot de passe en clair

            // Hachage du mot de passe
            const saltRounds = 10; // Nombre de tours pour le hachage
            const password_hash = await bcrypt.hash(password, saltRounds);

            const newUser = {
                username,
                email,
                password_hash, // Utilisez le mot de passe haché ici
                full_name
            };

            const user = await User.createUser(newUser);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAllUsers(); // Ajoutez cette méthode dans userModel
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    assignRole: async (req, res) => {
        try {
            const { roleId } = req.body;
            const assignedRole = await User.assignRole(req.params.id, roleId);
            res.status(201).json(assignedRole);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUserRoles: async (req, res) => {
        try {
            const roles = await User.getUserRoles(req.params.id);
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userController;
