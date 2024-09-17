// Importamos el módulo de Express
const express = require("express");

// Importamos dotenv para manejar variables de entorno
require("dotenv").config();

// Módulo para manejar rutas de archivos
const path = require("path");

// Creamos una instancia de la aplicación
const app = express();

// Middleware para parsear el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Creamos una ruta de ejemplo
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Usamos el puerto definido en el archivo .env o por defecto el puerto 3000
const PORT = process.env.PORT || 3000;

// Importar las rutas de los recursos (reservas y hoteles)
const reservaRoutes = require("./routes/reservaRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

// Usar las rutas de los recursos (reservas y hoteles)
app.use("/reservas", reservaRoutes);
app.use("/hoteles", hotelRoutes);

// Iniciamos el servidor con Express
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
