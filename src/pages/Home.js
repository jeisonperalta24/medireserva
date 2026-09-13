function Home() {
  return (
    <div>

      {/* HERO */}
      <div className="bg-dark text-white p-5 text-center">

        <h1 className="display-4 fw-bold">
          Aprende Tecnología desde Cero
        </h1>

        <p className="lead mt-3">
          Plataforma moderna de educación digital.
        </p>

        <button className="btn btn-primary btn-lg mt-3">
          Explorar Cursos
        </button>

      </div>

      {/* CONTENIDO */}
      <div className="container mt-5">

        <div className="row">

          <div className="col-md-4">
            <div className="card shadow p-4 mb-4">

              <h3>Programación</h3>

              <p>
                Aprende desarrollo web moderno.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4 mb-4">

              <h3>Diseño Web</h3>

              <p>
                Domina HTML, CSS y Bootstrap.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4 mb-4">

              <h3>React</h3>

              <p>
                Construye aplicaciones SPA.
              </p>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;