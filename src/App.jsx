import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router";
import ApplicationsPage from "./pages/ApplicationsPage";
import AddApplicationPage from "./pages/AddApplicationPage";

const API_URL =
  "https://6ab0872f9751d2b03e6c31a2.mockapi.io/api/v1/applications";

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/applications">
          JobTrack
        </Link>

        <nav aria-label="Main navigation">
          <Link to="/applications">Applications</Link>

          <Link className="nav-action" to="/applications/new">
            Add application
          </Link>
        </nav>
      </header>

      <main className="page-content">{children}</main>
    </div>
  );
}

function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load applications");
        }

        return response.json();
      })
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function addApplication(values) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("Failed to create application");
    }

    const newApplication = await response.json();

    setApplications((previous) => [
      newApplication,
      ...previous,
    ]);

    return newApplication;
  }

  async function deleteApplication(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete application");
    }

    setApplications((previous) =>
      previous.filter(
        (application) => application.id !== id,
      ),
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/applications"
            element={
              <ApplicationsPage
                applications={applications}
                loading={loading}
                error={error}
                onDelete={deleteApplication}
              />
            }
          />

          <Route
            path="/applications/new"
            element={
              <AddApplicationPage
                onAdd={addApplication}
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/applications"
                replace
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;