import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* HERO */}
      <div className="bg-primary text-white p-5 text-center">

        <h1 className="display-4 fw-bold">
          MediReserva
        </h1>

        <p className="lead mt-3">
          Sistema de reservas médicas
        </p>

        <p className="mt-3">
          Consulta médicos, revisa su disponibilidad y agenda tus citas
          de manera fácil y rápida.
        </p>

        <Link
          to="/medicos"
          className="btn btn-light btn-lg mt-3"
        >
          Consultar médicos
        </Link>

      </div>

      {/* SERVICIOS */}
      <div className="container mt-5">

        <h2 className="text-center mb-4">
          Servicios de MediReserva
        </h2>

        <div className="row">

          {/* Médicos */}
          <div className="col-md-4">
            <div className="card shadow p-4 mb-4 h-100">

              <h3 className="text-primary">
                Médicos
              </h3>

              <p>
                Consulta los médicos disponibles y conoce su especialidad.
              </p>

              <Link
                to="/medicos"
                className="btn btn-primary"
              >
                Ver médicos
              </Link>

            </div>
          </div>

          {/* Reservas */}
          <div className="col-md-4">
            <div className="card shadow p-4 mb-4 h-100">

              <h3 className="text-primary">
                Reservar cita
              </h3>

              <p>
                Selecciona el médico, fecha y horario para registrar
                una nueva reserva.
              </p>

              <Link
                to="/reservar"
                className="btn btn-primary"
              >
                Reservar cita
              </Link>

            </div>
          </div>

          {/* Mis reservas */}
          <div className="col-md-4">
            <div className="card shadow p-4 mb-4 h-100">

              <h3 className="text-primary">
                Mis reservas
              </h3>

              <p>
                Consulta las citas médicas que tienes registradas.
              </p>

              <Link
                to="/mis-reservas"
                className="btn btn-primary"
              >
                Ver mis reservas
              </Link>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;