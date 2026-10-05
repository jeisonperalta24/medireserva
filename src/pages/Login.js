import React, { useState } from "react";
import { iniciarSesion } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!correo || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setCargando(true);

    try {
      const usuario = await iniciarSesion(correo, password);

      // Guardamos temporalmente el usuario en el navegador
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redireccionar según el perfil
      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/mis-reservas");
      }
    } catch (error) {
      console.error(error);
      setError("Correo o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Iniciar sesión
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={manejarLogin}>

                <div className="mb-3">
                  <label className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando ? "Ingresando..." : "Iniciar sesión"}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;