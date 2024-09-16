const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
require('dotenv').config(); 

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  
}));

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/orders', orderRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
