// Importa el módulo de modelo de reserva desde el archivo reservaModel en el directorio 'models'
const reservas = require("../models/reservaModel");

/*
Ruta GET /reserva
*/
const obtenerReservas = (req, res) => {
  res.json({ mensaje: "Lista de reservas", reservas });
};

/*
Ruta GET /reserva/:id
*/
const obtenerReservaPorId = (req, res) => {
  const idReserva = parseInt(req.params.id);
  const reserva = reservas.find((r) => r.id === idReserva);

  if (!reserva) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  res.json({ mensaje: `Información de la Reserva: ${idReserva}`, reserva });
};

/*
Ruta POST /reserva
*/
const crearReserva = (req, res) => {
  const { nombre, edad, reservaHotel } = req.body;

  if (!nombre || !edad || !reservaHotel) {
    return res
      .status(400)
      .json({ error: "El nombre, edad y hotel a reservar son requeridos" });
  }

  const nuevaReserva = {
    id: reservas.length + 1,
    nombre,
    edad,
    reservaHotel,
  };

  reservas.push(nuevaReserva);

  res
    .status(201)
    .json({ mensaje: "Reserva creada exitosamente", reserva: nuevaReserva });
};

/*
Ruta PUT /reserva/:id
*/
const actualizarReserva = (req, res) => {
  const idReserva = parseInt(req.params.id);
  const { nombre, edad, reservaHotel } = req.body;

  const reserva = reservas.find((r) => r.id === idReserva);

  if (!reserva) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  reserva.nombre = nombre || reserva.nombre;
  reserva.edad = edad || reserva.edad;
  reserva.reservaHotel = reservaHotel || reserva.reservaHotel;

  res.json({
    mensaje: `Reserva con ID: ${idReserva} actualizada exitosamente`,
    reserva,
  });
};

/*
Ruta DELETE /reserva/:id
*/
const eliminarReserva = (req, res) => {
  const idReserva = parseInt(req.params.id);
  const indice = reservas.findIndex((r) => r.id === idReserva);

  if (indice === -1) {
    return res.status(404).json({ error: "Reserva no encontrada" });
  }

  reservas.splice(indice, 1);

  res.json({ mensaje: `Reserva con ID: ${idReserva} eliminada exitosamente` });
};

// Exporta los controladores para ser utilizados en las rutas
module.exports = {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
};
