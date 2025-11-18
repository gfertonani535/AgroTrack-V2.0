const fs = require("fs");
const path = require("path");

// Función para renderizar la plantilla de error
function cargarPaginaError(status, titulo, mensaje) {
    const archivo = path.join(__dirname, "..", "public", "error.html");
    let html = fs.readFileSync(archivo, "utf8");

    html = html.replace("{{STATUS}}", status);
    html = html.replace("{{TITLE}}", titulo);
    html = html.replace("{{MESSAGE}}", mensaje);

    return html;
}

// 404 → Página no encontrada
function manejar404(req, res) {
    const html = cargarPaginaError(
        404,
        "Página no encontrada",
        `La ruta <b>${req.originalUrl}</b> no existe en el servidor.`
    );

    res.status(404).send(html);
}

// 500 → Error interno
function manejarErrores(err, req, res, next) {
    console.error("Error interno:", err);

    if (req.originalUrl.startsWith("/api")) {
        return res.status(500).json({
            error: "Error interno del servidor",
            detalle: err.message
        });
    }

    const html = cargarPaginaError(
        500,
        "Error interno del servidor",
        "Ocurrió un problema inesperado. Intente nuevamente más tarde."
    );

    res.status(500).send(html);
}

module.exports = { manejar404, manejarErrores };
