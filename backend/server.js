const express = require('express');
const cors = require('cors');
const path = require('path');
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
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  /^https:\/\/enterprise-crm-frontend[-\w]*\.onrender\.com$/,
  /^https:\/\/enterprise-crm-backend[-\w]*\.onrender\.com$/,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => o instanceof RegExp ? o.test(origin) : o === origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/activities', activityRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CRM backend running on port ${PORT}`);
});
