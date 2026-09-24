import { useEffect, useState } from "react"
import ApplicationList from "../components/ApplicationList"

function ApplicationsPage() {
  // State variables for applications, loading status, and error message
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
  return (
    <main>
      <h1>Applications</h1>
      <ApplicationList applications={applications} onDelete={handleDelete} />
    </main>
  )
}

export default ApplicationsPage