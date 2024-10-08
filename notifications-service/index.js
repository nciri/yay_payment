const express = require('express');
const notificationRoutes = require('./routes/Routes');
const db = require('./db');

const app = express();
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Notifications service running on port ${PORT}`);
});
