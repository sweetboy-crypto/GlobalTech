const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { startStatusUpdateCron } = require('./services/cronJobs');

// Load env vars
dotenv.config({ path: './.env' });

const app = express();

// Connect to database
connectDB();

// Start cron jobs
startStatusUpdateCron();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/packages', require('./routes/packages'));

// Admin Routes
app.use('/api/admin/dashboard', require('./routes/admin/dashboard'));
app.use('/api/admin/users', require('./routes/admin/users'));
app.use('/api/admin/payments', require('./routes/admin/payments'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
