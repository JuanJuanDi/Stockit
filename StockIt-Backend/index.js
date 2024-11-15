const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const providerRoutes = require('./routes/providerRoutes');
const app = express();

require('dotenv').config();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(cors());
app.use(express.json());

// Ruta para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor de Stock It en funcionamiento');
});

// Rutas
app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

