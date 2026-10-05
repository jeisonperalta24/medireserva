const API_URL = "http://localhost:3001";

// Obtener todos los médicos
export const obtenerMedicos = async () => {
  const respuesta = await fetch(`${API_URL}/medicos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los médicos");
  }

  return await respuesta.json();
};

// Obtener un médico por su ID
export const obtenerMedicoPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/medicos/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el médico");
  }

  return await respuesta.json();
};

// Crear una nueva reserva
export const crearReserva = async (reserva) => {
  // Obtener las reservas existentes
  const respuestaReservas = await fetch(`${API_URL}/reservas`);

  if (!respuestaReservas.ok) {
    throw new Error("No se pudieron consultar las reservas");
  }

  const reservas = await respuestaReservas.json();

  // Obtener solamente los IDs numéricos
  const ids = reservas
    .map((reserva) => Number(reserva.id))
    .filter((id) => Number.isInteger(id));

  // Calcular el siguiente ID
  const nuevoId = ids.length > 0
    ? Math.max(...ids) + 1
    : 1;

  // Crear la nueva reserva con ID numérico
  const nuevaReserva = {
    id: nuevoId,
    ...reserva
  };

  // Registrar la reserva
  const respuesta = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevaReserva)
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear la reserva");
  }

  return await respuesta.json();
};

// Obtener todas las reservas
export const obtenerReservas = async () => {
  const respuesta = await fetch(`${API_URL}/reservas`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las reservas");
  }

  return await respuesta.json();
};

// Obtener una reserva por su ID
export const obtenerReservaPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/reservas/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la reserva");
  }

  return await respuesta.json();
};

// Iniciar sesión
export const iniciarSesion = async (correo, password) => {
  const respuesta = await fetch(`${API_URL}/usuarios`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron consultar los usuarios");
  }

  const usuarios = await respuesta.json();

  const usuarioEncontrado = usuarios.find(
    (usuario) =>
      usuario.correo === correo &&
      usuario.password === password
  );

  if (!usuarioEncontrado) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return usuarioEncontrado;
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  const respuesta = await fetch(`${API_URL}/usuarios`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los usuarios");
  }

  return await respuesta.json();
};

// Obtener un usuario por su ID
export const obtenerUsuarioPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/usuarios/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  return await respuesta.json();
};

// Actualizar un usuario
export const actualizarUsuario = async (id, usuario) => {
  const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo actualizar el usuario");
  }

  return await respuesta.json();
};

// Eliminar un usuario
export const eliminarUsuario = async (id) => {
  const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE"
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el usuario");
  }

  return true;
};

export const registrarUsuario = async (usuario) => {
  // Consultar usuarios actuales
  const respuestaUsuarios = await fetch(`${API_URL}/usuarios`);

  if (!respuestaUsuarios.ok) {
    throw new Error("No se pudieron consultar los usuarios");
  }

  const usuarios = await respuestaUsuarios.json();

  // Obtener los IDs numéricos existentes
  const ids = usuarios
    .map((usuario) => Number(usuario.id))
    .filter((id) => Number.isInteger(id));

  // Calcular el siguiente ID
  const nuevoId = ids.length > 0
    ? Math.max(...ids) + 1
    : 1;

  // Crear usuario con ID numérico consecutivo
  const nuevoUsuario = {
    id: nuevoId,
    ...usuario
  };

  const respuesta = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoUsuario)
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo registrar el usuario");
  }

  return await respuesta.json();
};

// Actualizar una reserva
export const actualizarReserva = async (id, reserva) => {
  const respuesta = await fetch(`${API_URL}/reservas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reserva)
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo actualizar la reserva");
  }

  return await respuesta.json();
};

// Eliminar una reserva
export const eliminarReserva = async (id) => {
  const respuesta = await fetch(`${API_URL}/reservas/${id}`, {
    method: "DELETE"
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar la reserva");
  }

  return true;
};

// Obtener reservas de un médico en una fecha específica
export const obtenerReservasPorMedicoYFecha = async (medico, fecha) => {
  const respuesta = await fetch(`${API_URL}/reservas`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron consultar las reservas");
  }

  const reservas = await respuesta.json();

  // Filtrar las reservas por médico y fecha
  const reservasFiltradas = reservas.filter(
    (reserva) =>
      reserva.medico === medico &&
      reserva.fecha === fecha
  );

  return reservasFiltradas;
};