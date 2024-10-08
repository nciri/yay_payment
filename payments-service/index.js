const express = require('express');
const paymentRoutes = require('./routes/transactionRoutes');
const refundRoutes = require('./routes/refundRoutes');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/refunds', refundRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Payments service running on port ${PORT}`);
});
