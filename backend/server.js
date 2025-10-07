require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { init } = require('./db');
const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entries');

const app = express();
app.use(cors());
app.use(express.json());

init();

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on', PORT));
