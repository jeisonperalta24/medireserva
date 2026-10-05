import React from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Panel de Administración</h1>

      <p className="lead">
        Bienvenido al panel de administración de MediReserva.
      </p>

      <div className="row mt-4">

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3>Usuarios</h3>

              <p>
                Consulta y administra los usuarios registrados
                en la plataforma.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/usuarios")}
              >
                Gestionar usuarios
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3>Reservas</h3>

              <p>
                Consulta y administra las reservas médicas
                realizadas por los pacientes.
              </p>

              <button
                className="btn btn-success"
                onClick={() => navigate("/admin/reservas")}
              >
                Gestionar reservas
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Admin;