import { useEffect, useState } from "react"
import ApplicationList from "../components/ApplicationList"

function ApplicationsPage() {
  // State variables for applications, loading status, and error message
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  useEffect(() => {
    fetch("https://6ab0872f9751d2b03e6c31a2.mockapi.io/api/v1/applications")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load applications")
        }

        return response.json()
      })
      .then((data) => {
        setApplications(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
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
  function handleDelete(id) {
    fetch(`https://6ab0872f9751d2b03e6c31a2.mockapi.io/api/v1/applications/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete application")
        }
        setApplications((prevApplications) =>
          prevApplications.filter((application) => application.id !== id)
        )
      })
      .catch((error) => {
        setError(error.message)
      })
  }
  // Filter applications based on the selected status before rendering
  const filteredApplications = selectedStatus === "All"
    ? applications
    : applications.filter(application => application.status === selectedStatus)
  return (
    <main>
      <h1>Applications</h1>
      <label>
        Filter by status:
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>
      <ApplicationList applications={filteredApplications} onDelete={handleDelete} />
    </main>
  )
}

export default ApplicationsPage