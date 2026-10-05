import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const usuarioGuardado = localStorage.getItem("usuario");
  const usuario = usuarioGuardado
    ? JSON.parse(usuarioGuardado)
    : null;

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary p-3">
      <div className="container">

        {/* Logo / Nombre del sistema */}
        <Link className="navbar-brand text-white fw-bold" to="/">
          MediReserva
        </Link>

        <div className="d-flex align-items-center">

          {/* Opciones generales */}
          <Link className="text-white text-decoration-none me-3" to="/">
            Inicio
          </Link>

          <Link className="text-white text-decoration-none me-3" to="/medicos">
            Médicos
          </Link>

          {/* Opciones para paciente */}
          {usuario && usuario.rol === "paciente" && (
            <>
              <Link
                className="text-white text-decoration-none me-3"
                to="/reservar"
              >
                Reservar cita
              </Link>

              <Link
                className="text-white text-decoration-none me-3"
                to="/mis-reservas"
              >
                Mis reservas
              </Link>
            </>
          )}

          {/* Opciones para administrador */}
          {usuario && usuario.rol === "admin" && (
            <Link
              className="text-white text-decoration-none me-3"
              to="/admin"
            >
              Panel administrativo
            </Link>
          )}

          {/* Si no ha iniciado sesión */}
          {!usuario && (
            <>
              <Link
                className="text-white text-decoration-none me-3"
                to="/login"
              >
                Iniciar sesión
              </Link>

              <Link
                className="text-white text-decoration-none me-3"
                to="/registro"
              >
                Registrarse
              </Link>
            </>
          )}

          {/* Si hay sesión iniciada */}
          {usuario && (
            <>
              <span className="text-white me-3">
                Hola, {usuario.nombre}
              </span>

              <button
                className="btn btn-light btn-sm"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;