import { useState } from "react"
import ApplicationList from "../components/ApplicationList"

function ApplicationsPage({
  applications,
  loading,
  error,
  onDelete
}) {
  // State variables for applications, loading status, and error message
  
  const [selectedStatus, setSelectedStatus] = useState("All")

  // Conditional rendering for loading, error, or empty state before displaying the list of applications
  if (loading) {
    return <p>Loading applications...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (applications.length === 0) {
    return <p>No applications found.</p>
  }
  
  // Filter applications based on the selected status before rendering
  const filteredApplications = selectedStatus === "All"
    ? applications
    : applications.filter(application => application.status === selectedStatus)
  return (
    <main>
      <h1>Applications</h1>
      <p className="page-subtitle">
        Track and manage your job applications.
      </p>

      <div className="filter-row">
        <label htmlFor="status-filter">
          Filter by status
        </label>

        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <ApplicationList
        applications={filteredApplications}
        onDelete={onDelete}
      />
    </main>
  )
}

export default ApplicationsPage