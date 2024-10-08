const express = require('express');
const reportRoutes = require('./routes/Routes');
const db = require('./db');

const app = express();
app.use(express.json());

app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Reports service running on port ${PORT}`);
});
