import React, { useState } from "react";
import { registrarUsuario } from "../services/api";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    setError("");
    setMensaje("");

    if (!nombre || !correo || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setCargando(true);

    try {
      const nuevoUsuario = {
        nombre,
        correo,
        password,
        rol: "paciente"
      };

      await registrarUsuario(nuevoUsuario);

      setMensaje("Usuario registrado correctamente.");

      setNombre("");
      setCorreo("");
      setPassword("");

    } catch (error) {
      console.error(error);
      setError("No se pudo registrar el usuario.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow-sm">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Crear cuenta
              </h2>

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

              <form onSubmit={manejarRegistro}>

                <div className="mb-3">

                  <label className="form-label">
                    Nombre completo
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) =>
                      setNombre(e.target.value)
                    }
                    placeholder="Ingresa tu nombre"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) =>
                      setCorreo(e.target.value)
                    }
                    placeholder="correo@ejemplo.com"
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Ingresa una contraseña"
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando
                    ? "Registrando..."
                    : "Crear cuenta"}
                </button>

              </form>

              <div className="text-center mt-3">

                <button
                  className="btn btn-link"
                  onClick={() => navigate("/login")}
                >
                  Ya tengo una cuenta
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Registro;