const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/connect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Use contacts routes
const contactsRoutes = require('./routes/contacts');
app.use('/', contactsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
