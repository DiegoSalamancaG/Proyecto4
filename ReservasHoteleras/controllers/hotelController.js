// Importa el módulo de modelo de hotel desde el archivo hotelModel en el directorio 'models'
const hoteles = require("../models/hotelModel");

/*
Ruta GET /hoteles
*/
const obtenerHoteles = (req, res) => {
  res.json({ mensaje: "Lista de Hoteles", hoteles });
};

/*
Ruta GET /hoteles/:id
*/
const obtenerHotelPorId = (req, res) => {
  const idHotel = parseInt(req.params.id); // Corregido a parseInt
  const hotel = hoteles.find((h) => h.id === idHotel);

  if (!hotel) {
    return res.status(400).json({ error: "Hotel no encontrado" });
  }

  res.json({ mensaje: `Información del Hotel: ${idHotel}`, hotel });
};

/*
Ruta POST /hoteles
*/
const crearHotel = (req, res) => {
  const { nombre, numeroHabitaciones } = req.body;

  if (!nombre || !numeroHabitaciones) {
    return res
      .status(400)
      .json({ error: "El nombre y el número de habitaciones son requeridos" });
  }

  const nuevoHotel = {
    id: hoteles.length + 1,
    nombre,
    numeroHabitaciones,
  };

  hoteles.push(nuevoHotel);

  res
    .status(201)
    .json({ mensaje: "Hotel creado exitosamente", hotel: nuevoHotel });
};

/*
Ruta PUT /hoteles/:id
*/
const actualizarHotel = (req, res) => {
  const idHotel = parseInt(req.params.id); // Corregido a parseInt
  const { nombre, numeroHabitaciones } = req.body;

  const hotel = hoteles.find((h) => h.id === idHotel);

  if (!hotel) {
    return res.status(404).json({ error: "Hotel no encontrado" });
  }

  hotel.nombre = nombre || hotel.nombre;
  hotel.numeroHabitaciones = numeroHabitaciones || hotel.numeroHabitaciones;

  res.json({
    mensaje: `Hotel con ID: ${idHotel} actualizado exitosamente`,
    hotel,
  });
};

/*
Ruta DELETE /hoteles/:id
*/
const eliminarHotel = (req, res) => {
  const idHotel = parseInt(req.params.id); // Corregido a parseInt
  const indice = hoteles.findIndex((h) => h.id === idHotel);

  if (indice === -1) {
    // Corregido el operador de comparación
    return res.status(404).json({ error: "Hotel no encontrado" });
  }

  hoteles.splice(indice, 1);

  res.json({ mensaje: `Hotel con ID: ${idHotel} eliminado exitosamente` });
};

// Exporta los controladores para ser utilizados en las rutas
module.exports = {
  obtenerHoteles,
  obtenerHotelPorId,
  crearHotel,
  actualizarHotel,
  eliminarHotel,
};
