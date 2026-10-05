import React, { useEffect, useState } from "react";

import {
  obtenerReservas,
  actualizarReserva
} from "../services/api";

import { useNavigate } from "react-router-dom";

function MisReservas() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [reservas, setReservas] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar usuario y reservas
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

    const cargarReservas = async () => {
      try {
        setCargando(true);
        setError("");

        const datos = await obtenerReservas();

        const reservasPaciente = datos.filter(
          (reserva) =>
            reserva.correoPaciente === usuarioActual.correo
        );

        setReservas(reservasPaciente);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar tus reservas.");
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, [navigate]);

  // Cancelar una reserva
  const cancelarReserva = async (reserva) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas cancelar la cita con ${reserva.medico} el ${reserva.fecha} a las ${reserva.hora}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");
      setMensaje("");

      const reservaActualizada = {
        ...reserva,
        estado: "Cancelada"
      };

      await actualizarReserva(
        reserva.id,
        reservaActualizada
      );

      // Actualizar la reserva en pantalla
      setReservas((reservasActuales) =>
        reservasActuales.map((item) =>
          item.id === reserva.id
            ? reservaActualizada
            : item
        )
      );

      setMensaje("La reserva fue cancelada correctamente.");
    } catch (error) {
      console.error(error);
      setError("No se pudo cancelar la reserva.");
    }
  };

  return (
    <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-md-10">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                Mis reservas
              </h3>
            </div>

            <div className="card-body">

              {usuario && (
                <div className="alert alert-secondary">
                  <strong>Paciente:</strong>{" "}
                  {usuario.nombre}

                  <br />

                  <strong>Correo:</strong>{" "}
                  {usuario.correo}
                </div>
              )}

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

              {cargando ? (
                <div className="text-center p-4">
                  <p>Cargando reservas...</p>
                </div>
              ) : reservas.length === 0 ? (
                <div className="alert alert-info">
                  No tienes reservas registradas.
                </div>
              ) : (
                <div className="table-responsive">

                  <table className="table table-bordered table-hover align-middle">

                    <thead className="table-primary">
                      <tr>
                        <th>Médico</th>
                        <th>Especialidad</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>

                    <tbody>

                      {reservas.map((reserva) => (

                        <tr key={reserva.id}>

                          <td>
                            {reserva.medico}
                          </td>

                          <td>
                            {reserva.especialidad}
                          </td>

                          <td>
                            {reserva.fecha}
                          </td>

                          <td>
                            {reserva.hora}
                          </td>

                          <td>

                            {reserva.estado === "Confirmada" && (
                              <span className="badge bg-success">
                                Confirmada
                              </span>
                            )}

                            {reserva.estado === "Pendiente" && (
                              <span className="badge bg-warning text-dark">
                                Pendiente
                              </span>
                            )}

                            {reserva.estado === "Cancelada" && (
                              <span className="badge bg-danger">
                                Cancelada
                              </span>
                            )}

                          </td>

                          <td>

                            {reserva.estado !== "Cancelada" ? (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  cancelarReserva(reserva)
                                }
                              >
                                Cancelar
                              </button>
                            ) : (
                              <span className="text-muted">
                                Sin acciones
                              </span>
                            )}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>
              )}

              <div className="mt-4 d-flex gap-2">

                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/reservar")}
                >
                  Reservar nueva cita
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/")}
                >
                  Volver al inicio
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MisReservas;