import React, { useEffect, useState } from "react";
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} from "../services/api";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [idBusqueda, setIdBusqueda] = useState("");
  const [usuarioBuscado, setUsuarioBuscado] = useState(null);

  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const datos = await obtenerUsuarios();

      setUsuarios(datos);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar los usuarios.");
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // BUSCAR USUARIO POR ID
  const buscarUsuario = async () => {
    // Limpiar resultado y error anterior
    setUsuarioBuscado(null);
    setError("");

    // Validar que exista un ID
    if (!idBusqueda) {
      setError("Ingresa un ID de usuario.");
      return;
    }

    try {
      const usuario = await obtenerUsuarioPorId(idBusqueda);

      setUsuarioBuscado(usuario);
    } catch (error) {
      console.error(error);
      setUsuarioBuscado(null);
      setError("No se encontró un usuario con ese ID.");
    }
  };

  // LIMPIAR BÚSQUEDA
  const limpiarBusqueda = () => {
    setIdBusqueda("");
    setUsuarioBuscado(null);
    setError("");
  };

  // INICIAR EDICIÓN
  const iniciarEdicion = (usuario) => {
    setUsuarioEditando({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.password,
      rol: usuario.rol
    });

    setError("");
  };

  // CAMBIAR DATOS DEL FORMULARIO
  const manejarCambio = (e) => {
    setUsuarioEditando({
      ...usuarioEditando,
      [e.target.name]: e.target.value
    });
  };

  // GUARDAR CAMBIOS
  const guardarCambios = async () => {
    try {
      setError("");

      await actualizarUsuario(
        usuarioEditando.id,
        {
          nombre: usuarioEditando.nombre,
          correo: usuarioEditando.correo,
          password: usuarioEditando.password,
          rol: usuarioEditando.rol
        }
      );

      alert("Usuario actualizado correctamente.");

      setUsuarioEditando(null);

      await cargarUsuarios();

    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el usuario.");
    }
  };

  // ELIMINAR USUARIO
  const manejarEliminar = async (usuario) => {
    const confirmar = window.confirm(
      `¿Está seguro de eliminar al usuario ${usuario.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");

      await eliminarUsuario(usuario.id);

      alert("Usuario eliminado correctamente.");

      // Si el usuario eliminado era el que estaba siendo buscado,
      // limpiamos el resultado.
      if (String(usuarioBuscado?.id) === String(usuario.id)) {
        setUsuarioBuscado(null);
        setIdBusqueda("");
      }

      await cargarUsuarios();

    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el usuario.");
    }
  };

  if (cargando) {
    return (
      <div className="container mt-5">
        <h2>Cargando usuarios...</h2>
      </div>
    );
  }

  if (error && usuarios.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h1 className="mb-4">
        Gestión de usuarios
      </h1>

      {/* CONSULTAR USUARIO POR ID */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <h5 className="mb-3">
            Consultar usuario por ID
          </h5>

          <div className="row align-items-end">

            <div className="col-md-6">

              <label className="form-label">
                ID del usuario
              </label>

              <input
                type="number"
                min="1"
                step="1"
                className="form-control"
                value={idBusqueda}
                onChange={(e) => {
                  const valor = e.target.value;

                  // Solo permitir números enteros positivos
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
                onClick={buscarUsuario}
              >
                Buscar usuario
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

      {/* RESULTADO DE BÚSQUEDA */}

      {usuarioBuscado && (
        <div className="alert alert-success">

          <h5>
            Usuario encontrado
          </h5>

          <p>
            <strong>ID:</strong>{" "}
            {usuarioBuscado.id}
          </p>

          <p>
            <strong>Nombre:</strong>{" "}
            {usuarioBuscado.nombre}
          </p>

          <p>
            <strong>Correo:</strong>{" "}
            {usuarioBuscado.correo}
          </p>

          <p>
            <strong>Rol:</strong>{" "}
            {usuarioBuscado.rol}
          </p>

        </div>
      )}

      {/* MENSAJE DE ERROR */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* FORMULARIO DE EDICIÓN */}

      {usuarioEditando && (
        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <h4 className="mb-4">
              Editar usuario
            </h4>

            <div className="mb-3">

              <label className="form-label">
                Nombre
              </label>

              <input
                type="text"
                name="nombre"
                className="form-control"
                value={usuarioEditando.nombre}
                onChange={manejarCambio}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Correo
              </label>

              <input
                type="email"
                name="correo"
                className="form-control"
                value={usuarioEditando.correo}
                onChange={manejarCambio}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Contraseña
              </label>

              <input
                type="text"
                name="password"
                className="form-control"
                value={usuarioEditando.password}
                onChange={manejarCambio}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Rol
              </label>

              <select
                name="rol"
                className="form-select"
                value={usuarioEditando.rol}
                onChange={manejarCambio}
              >

                <option value="paciente">
                  Paciente
                </option>

                <option value="admin">
                  Administrador
                </option>

              </select>

            </div>

            <button
              className="btn btn-success me-2"
              onClick={guardarCambios}
            >
              Guardar cambios
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setUsuarioEditando(null)}
            >
              Cancelar
            </button>

          </div>

        </div>
      )}

      {/* TABLA DE USUARIOS */}

      {usuarios.length === 0 ? (

        <div className="alert alert-info">
          No existen usuarios registrados.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>

            </thead>

            <tbody>

              {usuarios.map((usuario) => (

                <tr key={usuario.id}>

                  <td>
                    {usuario.id}
                  </td>

                  <td>
                    {usuario.nombre}
                  </td>

                  <td>
                    {usuario.correo}
                  </td>

                  <td>
                    {usuario.rol}
                  </td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        iniciarEdicion(usuario)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() =>
                        manejarEliminar(usuario)
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

export default AdminUsuarios;