import { useState } from "react"
import ApplicationList from "../components/ApplicationList"

function ApplicationsPage({
  applications,
  loading,
  error,
  onDelete,
}) {
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter(
          (application) =>
            application.status === selectedStatus
        )

  if (loading) {
    return <p>Loading applications...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

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
          onChange={(event) =>
            setSelectedStatus(event.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="empty-state">
          <h2>
            {applications.length === 0
              ? "No applications yet"
              : "No matching applications"}
          </h2>

          <p>
            {applications.length === 0
              ? "Add your first application to start tracking your search."
              : "Try another status filter."}
          </p>
        </div>
      ) : (
        <ApplicationList
          applications={filteredApplications}
          onDelete={onDelete}
        />
      )}
    </main>
  )
}

export default ApplicationsPage