import React, { useEffect, useState } from "react";
import {
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
} from "../services/api";

function AdminReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [idBusqueda, setIdBusqueda] = useState("");
  const [reservaBuscada, setReservaBuscada] = useState(null);

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const datos = await obtenerReservas();

      setReservas(datos);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar las reservas.");
      setCargando(false);
    }
  };

  // BUSCAR RESERVA POR ID
  const buscarReserva = async () => {
    // Limpiar resultado y error de la búsqueda anterior
    setReservaBuscada(null);
    setError("");

    if (!idBusqueda) {
      setError("Ingresa un ID de reserva.");
      return;
    }

    try {
      const reserva = await obtenerReservaPorId(idBusqueda);

      setReservaBuscada(reserva);
    } catch (error) {
      console.error(error);
      setReservaBuscada(null);
      setError("No se encontró una reserva con ese ID.");
    }
  };

  // LIMPIAR BÚSQUEDA
  const limpiarBusqueda = () => {
    setIdBusqueda("");
    setReservaBuscada(null);
    setError("");
  };

  // CAMBIAR ESTADO
  const cambiarEstado = async (reserva, nuevoEstado) => {
    try {
      setError("");

      const reservaActualizada = {
        ...reserva,
        estado: nuevoEstado
      };

      await actualizarReserva(
        reserva.id,
        reservaActualizada
      );

      alert(
        "Estado de la reserva actualizado correctamente."
      );

      await cargarReservas();

      if (
        reservaBuscada &&
        String(reservaBuscada.id) === String(reserva.id)
      ) {
        setReservaBuscada(reservaActualizada);
      }

    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar la reserva.");
    }
  };

  // ELIMINAR RESERVA
  const manejarEliminar = async (reserva) => {
    const confirmar = window.confirm(
      `¿Está seguro de eliminar la reserva de ${reserva.nombrePaciente}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");

      await eliminarReserva(reserva.id);

      alert("Reserva eliminada correctamente.");

      // Si eliminamos la reserva que se estaba consultando,
      // limpiamos el resultado.
      if (
        reservaBuscada &&
        String(reservaBuscada.id) === String(reserva.id)
      ) {
        setReservaBuscada(null);
        setIdBusqueda("");
      }

      await cargarReservas();

    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar la reserva.");
    }
  };

  if (cargando) {
    return (
      <div className="container mt-5">
        <h2>Cargando reservas...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h1 className="mb-4">
        Gestión de reservas
      </h1>

      {/* BUSCAR RESERVA */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h5 className="mb-3">
            Consultar reserva por ID
          </h5>

          <div className="row align-items-end">

            <div className="col-md-6">

              <label className="form-label">
                ID de la reserva
              </label>

              <input
                type="number"
                min="1"
                step="1"
                className="form-control"
                value={idBusqueda}
                onChange={(e) => {
                  const valor = e.target.value;

                  // Solo permitir números
                  if (/^\d*$/.test(valor)) {
                    setIdBusqueda(valor);
                  }
                }}
                placeholder="Ejemplo: 1"
              />

            </div>

            <div className="col-md-6 mt-3 mt-md-0">

              <button
                className="btn btn-primary me-2"
                onClick={buscarReserva}
              >
                Buscar reserva
              </button>

              <button
                className="btn btn-secondary"
                onClick={limpiarBusqueda}
              >
                Limpiar
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* RESERVA ENCONTRADA */}

      {reservaBuscada && (
        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <h5>
              Reserva encontrada
            </h5>

            <p>
              <strong>ID:</strong>{" "}
              {reservaBuscada.id}
            </p>

            <p>
              <strong>Paciente:</strong>{" "}
              {reservaBuscada.nombrePaciente}
            </p>

            <p>
              <strong>Médico:</strong>{" "}
              {reservaBuscada.medico}
            </p>

            <p>
              <strong>Especialidad:</strong>{" "}
              {reservaBuscada.especialidad}
            </p>

            <p>
              <strong>Fecha:</strong>{" "}
              {reservaBuscada.fecha}
            </p>

            <p>
              <strong>Hora:</strong>{" "}
              {reservaBuscada.hora}
            </p>

            <p>
              <strong>Estado actual:</strong>{" "}
              {reservaBuscada.estado}
            </p>

          </div>

        </div>
      )}

      {/* TABLA */}

      {reservas.length === 0 ? (

        <div className="alert alert-info">
          No existen reservas registradas.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>

            </thead>

            <tbody>

              {reservas.map((reserva) => (

                <tr key={reserva.id}>

                  <td>
                    {reserva.id}
                  </td>

                  <td>
                    {reserva.nombrePaciente}
                  </td>

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
                    {reserva.estado}
                  </td>

                  <td>

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        cambiarEstado(
                          reserva,
                          "Confirmada"
                        )
                      }
                    >
                      Confirmar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        cambiarEstado(
                          reserva,
                          "Cancelada"
                        )
                      }
                    >
                      Cancelar
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() =>
                        manejarEliminar(reserva)
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default AdminReservas;