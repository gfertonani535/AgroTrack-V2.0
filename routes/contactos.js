const express = require('express');
const router = express.Router();
const conexion = require('../db');

// Función auxiliar para validar email
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// GET /api/contactos → listar todos
router.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM contactos ORDER BY fecha DESC';
  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.error('Error al obtener contactos:', err.message);
      next(err);
    } else {
      res.json(resultados);
    }
  });
});

// POST /api/contactos → registrar uno nuevo
router.post('/', (req, res, next) => {
  const { nombre, email, mensaje } = req.body;

  // Validaciones
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  if (!validarEmail(email)) {
    return res.status(400).json({ error: 'El formato de email no es válido.' });
  }

  const sql = 'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)';
  const valores = [nombre, email, mensaje];

  conexion.query(sql, valores, (err, resultado) => {
    if (err) {
      console.error('Error al insertar contacto:', err.message);
      next(err);
    } else {
      res.status(201).json({
        mensaje: 'Contacto guardado correctamente',
        id_insertado: resultado.insertId
      });
    }
  });
});

module.exports = router;
