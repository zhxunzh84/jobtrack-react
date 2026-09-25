function ApplicationCard({ application, onDelete }) {
  return (
    <div className="application-card">
      <div className="application-card-header">
        <div>
          <h2>{application.company}</h2>
          <p className="job-title">{application.jobTitle}</p>
        </div>

        <span className={`status-badge status-${application.status.toLowerCase()}`}>
          {application.status}
        </span>
      </div>

      <p className="application-meta">
        Applied: {application.appliedDate}
      </p>

      <p className="application-notes">
        {application.notes}
      </p>

      <div className="application-actions">
        <button
          className="delete-button"
          onClick={() => onDelete(application.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ApplicationCard