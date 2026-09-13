function CourseCard({ title, description }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">
        <div className="card-body">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;