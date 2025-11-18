console.log('Variables cargadas:', process.env);

require('dotenv').config();
const mysql = require('mysql');

// Se crea la conexión única
const conexion = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'agrotrack'
});

// Conectamos
conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a MySQL - Base de datos AgroTrack');
  }
});

module.exports = conexion;
