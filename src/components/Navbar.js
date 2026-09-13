import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          EduTech
        </Link>

        <div>
          <Link className="text-white me-3" to="/">
            Inicio
          </Link>

          <Link className="text-white me-3" to="/courses">
            Cursos
          </Link>

          <Link className="text-white" to="/contact">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;