# AgroTrack - V 2.0
Giuliano Fertonani AO2 Programacion Web II Instrucciones para ejecutar: node server.js Puerto que utiliza: 8888

Proyecto desarrollado con **Node.js** y **Express**.  
Incluye conexión a **MySQL**, manejo de formularios, validaciones básicas y respuestas HTML o JSON.

# Ejecución

1. Crear la base de datos ejecutando `sql/schema.sql` en MySQL(Yo lo hice utilizando XAMPP).
2. Crear el archivo `.env` a partir de `.env.example` con tus credenciales.
3. Instalar dependencias:
   ```bash
   npm install express mysql dotenv
4. Ejecutar el servidor: npm start
5. Abrir en el navegador: http://localhost:3000

# Rutas Discponibles
GET	/	Página principal (index.html)
GET	/health	Estado del servidor en JSON
GET	/api/contactos	Lista todas las consultas registradas
POST	/api/contactos	Registra una nueva consulta

# Validaciones
Todos los campos son obligatorios.
El email debe tener formato válido.
Los errores se manejan directamente con res.status().send().

# Tecnologías usadas
Node.js + Express
MySQL (módulo mysql)
dotenv
HTML y CSS (páginas estáticas en /public)