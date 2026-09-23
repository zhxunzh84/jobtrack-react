import { useEffect, useState } from "react"
import ApplicationList from "../components/ApplicationList"

function ApplicationsPage() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    // Fetch applications from an API 
    const fetchApplications = async () => {
      const response = await fetch("https://6ab0872f9751d2b03e6c31a2.mockapi.io/api/v1/applications")
      const data = await response.json()
      setApplications(data)
    }
    fetchApplications()
  }, [])

  return (
    <main>
      <h1>Applications</h1>
      <ApplicationList applications={applications} />
    </main>
  )
}

export default ApplicationsPage