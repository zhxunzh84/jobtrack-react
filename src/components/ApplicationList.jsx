import ApplicationCard from './ApplicationCard';

function ApplicationList({ applications }) {
  return (
    <div>
      {applications.map(application => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
}

export default ApplicationList;