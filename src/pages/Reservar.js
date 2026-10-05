import React, { useEffect, useState } from "react";

import {
  crearReserva,
  obtenerMedicos,
  obtenerReservasPorMedicoYFecha
} from "../services/api";

import { useNavigate } from "react-router-dom";

function Reservar() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [medicos, setMedicos] = useState([]);

  const [medicoSeleccionado, setMedicoSeleccionado] = useState("");
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const obtenerFechaMinima = () => {
    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
  };

  const fechaMinima = obtenerFechaMinima();

  // Cargar usuario y médicos
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      navigate("/login");
      return;
    }

    const usuarioActual = JSON.parse(usuarioGuardado);

    if (usuarioActual.rol !== "paciente") {
      navigate("/");
      return;
    }

    setUsuario(usuarioActual);

    const cargarMedicos = async () => {
      try {
        const datos = await obtenerMedicos();
        setMedicos(datos);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los médicos.");
      }
    };

    cargarMedicos();
  }, [navigate]);

  // Obtener especialidades disponibles
  const especialidades = [
    ...new Set(
      medicos
        .filter((medico) => medico.disponible)
        .map((medico) => medico.especialidad)
    )
  ];

  // Obtener médico seleccionado
  const medicoActual = medicos.find(
    (medico) => medico.id.toString() === medicoSeleccionado
  );

  // Médicos filtrados por especialidad
  const medicosFiltrados = medicos.filter(
    (medico) =>
      medico.disponible &&
      (!especialidadSeleccionada ||
        medico.especialidad === especialidadSeleccionada)
  );

  // Consultar disponibilidad
  const consultarDisponibilidad = async (
    medico,
    fechaSeleccionada
  ) => {
    if (!medico || !fechaSeleccionada) {
      setHorariosDisponibles([]);
      return;
    }

    setCargandoHorarios(true);
    setHora("");
    setError("");

    try {
      const reservas = await obtenerReservasPorMedicoYFecha(
        medico.nombre,
        fechaSeleccionada
      );

      // Obtener las horas que ya están reservadas
      const horariosReservados = reservas
        .filter((reserva) => reserva.estado !== "Cancelada")
        .map((reserva) => reserva.hora);

      // Comparar las horas del médico con las horas reservadas
      const horariosLibres = medico.horarios.filter(
        (horario) => !horariosReservados.includes(horario)
      );

      setHorariosDisponibles(horariosLibres);
    } catch (error) {
      console.error(error);
      setError("No se pudo consultar la disponibilidad.");
      setHorariosDisponibles([]);
    } finally {
      setCargandoHorarios(false);
    }
  };

  // Cuando se selecciona una especialidad
  const manejarSeleccionEspecialidad = (e) => {
    const especialidad = e.target.value;

    setEspecialidadSeleccionada(especialidad);
    setMedicoSeleccionado("");
    setFecha("");
    setHora("");
    setHorariosDisponibles([]);
  };

  // Cuando se selecciona un médico
  const manejarSeleccionMedico = (e) => {
    const id = e.target.value;

    setMedicoSeleccionado(id);
    setHora("");
    setHorariosDisponibles([]);

    if (!id) {
      return;
    }

    const medico = medicos.find(
      (item) => item.id.toString() === id
    );

    if (medico) {
      setEspecialidadSeleccionada(medico.especialidad);

      if (fecha) {
        consultarDisponibilidad(medico, fecha);
      }
    }
  };

  // Cuando se selecciona una fecha
  const manejarSeleccionFecha = (e) => {
    const nuevaFecha = e.target.value;

    setFecha(nuevaFecha);
    setHora("");
    setError("");

    if (nuevaFecha < fechaMinima) {
      setError(
        "No puedes reservar una cita en una fecha anterior a hoy."
      );

      setHorariosDisponibles([]);
      return;
    }

    if (medicoActual && nuevaFecha) {
      consultarDisponibilidad(
        medicoActual,
        nuevaFecha
      );
    } else {
      setHorariosDisponibles([]);
    }
  };

  // Crear reserva
  const manejarReserva = async (e) => {
    e.preventDefault();

    setError("");
    setMensaje("");

    if (!usuario) {
      setError(
        "No se encontró la información del paciente."
      );
      return;
    }

    if (!especialidadSeleccionada) {
      setError("Debes seleccionar una especialidad.");
      return;
    }

    if (!medicoActual) {
      setError("Debes seleccionar un médico.");
      return;
    }

    if (!fecha) {
      setError("Debes seleccionar una fecha.");
      return;
    }

    if (fecha < fechaMinima) {
      setError(
        "No puedes reservar una cita en una fecha anterior a hoy."
      );
      return;
    }

    if (!hora) {
      setError("Debes seleccionar un horario.");
      return;
    }

    // Verificar que la hora siga disponible
    if (!horariosDisponibles.includes(hora)) {
      setError(
        "El horario seleccionado ya no está disponible."
      );
      return;
    }

    setCargando(true);

    try {
      const nuevaReserva = {
        nombrePaciente: usuario.nombre,
        correoPaciente: usuario.correo,
        medico: medicoActual.nombre,
        especialidad: especialidadSeleccionada,
        fecha: fecha,
        hora: hora,
        estado: "Pendiente"
      };

      await crearReserva(nuevaReserva);

      setMensaje("¡Reserva creada correctamente!");

      setMedicoSeleccionado("");
      setEspecialidadSeleccionada("");
      setFecha("");
      setHora("");
      setHorariosDisponibles([]);
    } catch (error) {
      console.error(error);
      setError("No se pudo crear la reserva.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                Reservar cita médica
              </h3>
            </div>

            <div className="card-body">

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              {mensaje && (
                <div className="alert alert-success">
                  {mensaje}
                </div>
              )}

              {/* DATOS DEL PACIENTE */}
              {usuario && (
                <div className="alert alert-secondary">

                  <h5>
                    Datos del paciente
                  </h5>

                  <strong>Nombre:</strong>{" "}
                  {usuario.nombre}

                  <br />

                  <strong>Correo:</strong>{" "}
                  {usuario.correo}

                </div>
              )}

              <form onSubmit={manejarReserva}>

                {/* ESPECIALIDAD */}
                <div className="mb-3">

                  <label className="form-label">
                    Especialidad
                  </label>

                  <select
                    className="form-select"
                    value={especialidadSeleccionada}
                    onChange={manejarSeleccionEspecialidad}
                  >

                    <option value="">
                      Selecciona una especialidad
                    </option>

                    {especialidades.map((especialidad) => (
                      <option
                        key={especialidad}
                        value={especialidad}
                      >
                        {especialidad}
                      </option>
                    ))}

                  </select>

                </div>

                {/* MÉDICO */}
                <div className="mb-3">

                  <label className="form-label">
                    Médico
                  </label>

                  <select
                    className="form-select"
                    value={medicoSeleccionado}
                    onChange={manejarSeleccionMedico}
                    disabled={!especialidadSeleccionada}
                  >

                    <option value="">
                      {especialidadSeleccionada
                        ? "Selecciona un médico"
                        : "Primero selecciona una especialidad"}
                    </option>

                    {medicosFiltrados.map((medico) => (
                      <option
                        key={medico.id}
                        value={medico.id}
                      >
                        {medico.nombre}
                      </option>
                    ))}

                  </select>

                </div>

                {/* INFORMACIÓN DEL MÉDICO */}
                {medicoActual && (
                  <div className="alert alert-info">

                    <strong>Médico:</strong>{" "}
                    {medicoActual.nombre}

                    <br />

                    <strong>Especialidad:</strong>{" "}
                    {medicoActual.especialidad}

                  </div>
                )}

                {/* FECHA */}
                <div className="mb-3">

                  <label className="form-label">
                    Fecha de la cita
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={fecha}
                    min={fechaMinima}
                    onChange={manejarSeleccionFecha}
                    disabled={!medicoActual}
                  />

                </div>

                {/* HORA */}
                <div className="mb-3">

                  <label className="form-label">
                    Hora disponible
                  </label>

                  <select
                    className="form-select"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    disabled={
                      !medicoActual ||
                      !fecha ||
                      cargandoHorarios
                    }
                  >

                    <option value="">
                      {cargandoHorarios
                        ? "Consultando disponibilidad..."
                        : !medicoActual
                        ? "Primero selecciona un médico"
                        : !fecha
                        ? "Primero selecciona una fecha"
                        : "Selecciona un horario"}
                    </option>

                    {horariosDisponibles.map((horario) => (
                      <option
                        key={horario}
                        value={horario}
                      >
                        {horario}
                      </option>
                    ))}

                  </select>

                  {medicoActual &&
                    fecha &&
                    !cargandoHorarios &&
                    horariosDisponibles.length === 0 && (
                      <div className="alert alert-warning mt-2">
                        No hay horarios disponibles para este médico
                        en la fecha seleccionada.
                      </div>
                    )}

                </div>

                {/* BOTONES */}
                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={cargando}
                  >
                    {cargando
                      ? "Guardando..."
                      : "Confirmar reserva"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate("/mis-reservas")
                    }
                  >
                    Ver mis reservas
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Reservar;