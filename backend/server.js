const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/utils/db');
const authRoutes = require('./src/routes/auth');
const leadRoutes = require('./src/routes/leads');
const customerRoutes = require('./src/routes/customers');
const analyticsRoutes = require('./src/routes/analytics');
const activityRoutes = require('./src/routes/activities');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/activities', activityRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CRM backend running on port ${PORT}`);
});
