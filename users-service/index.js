const express = require('express');
const userRoutes = require('./routes/Routes');
const db = require('./db');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Users service running on port ${PORT}`);
});
