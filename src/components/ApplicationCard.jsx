function ApplicationCard({ application, onDelete }) {
  return (
    <div>
      <h2>{application.company}</h2>
      <p>{application.jobTitle}</p>
      <p>Status: {application.status}</p>
      <p>Applied Date: {application.appliedDate}</p>
      <p>{application.notes}</p>
      <button onClick={() => onDelete(application.id)}>Delete</button>
    </div>
  )
}

export default ApplicationCard;