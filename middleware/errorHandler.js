function manejar404(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada' });
}

function manejarErrores(err, req, res, next) {
  console.error('Error interno del servidor:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = { manejar404, manejarErrores };
