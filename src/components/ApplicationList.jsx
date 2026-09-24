import ApplicationCard from './ApplicationCard';

function ApplicationList({ applications, onDelete }) {
  return (
    <div>
      {applications.map(application => (
        <ApplicationCard key={application.id} application={application} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default ApplicationList;