import React from "react";
import { Navigate } from "react-router-dom";

function RutaProtegida({ children, rolRequerido }) {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return <Navigate to="/login" replace />;
  }

  const usuario = JSON.parse(usuarioGuardado);

  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;