require('dotenv').config();
const express = require('express');
const path = require('path');

const contactosRouter = require('./routes/contactos');
const logger = require('./middleware/logger');
const { manejar404, manejarErrores } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de verificación (health)
app.get('/health', (req, res) => {
  res.status(200).json({
    estado: 'ok',
    fecha: new Date().toISOString()
  });
});

// API de contactos
app.use('/api/contactos', contactosRouter);

// Manejo de errores
app.use(manejar404);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor AgroTrack V2.0 en ejecución → http://localhost:${PORT}`);
});
