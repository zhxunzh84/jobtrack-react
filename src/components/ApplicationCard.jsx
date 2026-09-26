function ApplicationCard({ application, onDelete }) {
  return (
    <article className="application-card">
      <div className="card-main">
        <div className="card-title-row">
          <h2>{application.jobTitle}</h2>

          <span
            className={`status status-${application.status.toLowerCase()}`}
          >
            {application.status}
          </span>
        </div>

        <p className="company-name">
          {application.company}
        </p>

        <p className="application-date">
          Applied {application.appliedDate}
        </p>

        {application.notes && (
          <p className="notes">
            {application.notes}
          </p>
        )}
      </div>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(application.id)}
      >
        Delete
      </button>
    </article>
  )
}

export default ApplicationCard