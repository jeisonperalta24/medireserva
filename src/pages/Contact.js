function Contact() {
  return (
    <div className="container mt-5">

      <h2>Contacto</h2>

      <form>

        <div className="mb-3">
          <label className="form-label">
            Nombre
          </label>

          <input
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Correo
          </label>

          <input
            type="email"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Mensaje
          </label>

          <textarea
            className="form-control"
            rows="4"
          ></textarea>
        </div>

        <button className="btn btn-primary">
          Enviar
        </button>

      </form>

    </div>
  );
}

export default Contact;