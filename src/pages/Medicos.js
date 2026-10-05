import React, { useEffect, useState } from "react";
import {
  obtenerMedicos,
  obtenerMedicoPorId
} from "../services/api";

function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerMedicos()
      .then((datos) => {
        setMedicos(datos);
        setCargando(false);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudieron cargar los médicos.");
        setCargando(false);
      });
  }, []);

  const verDisponibilidad = async (id) => {
    try {
      const medico = await obtenerMedicoPorId(id);

      alert(
        `Médico: ${medico.nombre}\n` +
        `Especialidad: ${medico.especialidad}\n\n` +
        `Horarios disponibles:\n` +
        medico.horarios.join("\n")
      );
    } catch (error) {
      console.error(error);
      alert("No se pudo consultar la disponibilidad del médico.");
    }
  };

  if (cargando) {
    return (
      <div className="container mt-5">
        <h2>Cargando médicos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Médicos disponibles</h1>

      <div className="row">
        {medicos.map((medico) => (
          <div
            className="col-md-4 mb-4"
            key={medico.id}
          >
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {medico.nombre}
                </h5>

                <p className="card-text">
                  <strong>Especialidad:</strong>{" "}
                  {medico.especialidad}
                </p>

                <p>
                  <strong>Estado:</strong>{" "}
                  {medico.disponible
                    ? "Disponible"
                    : "No disponible"}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => verDisponibilidad(medico.id)}
                >
                  Ver disponibilidad
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Medicos;