const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/connect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//  swagger documentation
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();

});
// Connect DB
connectDB();

// Use contacts routes
const contactsRoutes = require('./routes/contacts');
app.use('/', contactsRoutes);

/* ========================= START SERVER ========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

