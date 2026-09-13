function Courses() {
  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Cursos Disponibles
      </h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow p-3 mb-4">
            <h4>React</h4>
            <p>
              Aprende React desde cero.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 mb-4">
            <h4>Python</h4>
            <p>
              Curso completo de Python.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3 mb-4">
            <h4>Diseño Web</h4>
            <p>
              HTML, CSS y Bootstrap.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Courses;