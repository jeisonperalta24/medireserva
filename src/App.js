import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Footer from './components/Footer';
import Medicos from "./pages/Medicos";
import Reservar from "./pages/Reservar";
import MisReservas from "./pages/MisReservas";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminUsuarios from "./pages/AdminUsuarios";
import Registro from "./pages/Registro";
import AdminReservas from "./pages/AdminReservas";
import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Médicos */}
        <Route path="/medicos" element={<Medicos />} />

        {/* Reservar cita */}
        <Route path="/reservar" element={<Reservar />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Mis reservas - solo pacientes */}
        <Route
          path="/mis-reservas"
          element={
            <RutaProtegida rolRequerido="paciente">
              <MisReservas />
            </RutaProtegida>
          }
        />

        {/* Panel administrativo */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rolRequerido="admin">
              <Admin />
            </RutaProtegida>
          }
        />

        {/* Administración de usuarios */}
        <Route
          path="/admin/usuarios"
          element={
            <RutaProtegida rolRequerido="admin">
              <AdminUsuarios />
            </RutaProtegida>
          }
        />

        {/* Administración de reservas */}
        <Route
          path="/admin/reservas"
          element={
            <RutaProtegida rolRequerido="admin">
              <AdminReservas />
            </RutaProtegida>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;