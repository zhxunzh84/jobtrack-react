import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import ApplicationForm from "./components/ApplicationForm";
import { STATUS_OPTIONS } from "./utils/validateApplication";

const STORAGE_KEY = "jobtrack-applications";

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

function ApplicationsPage({ applications, onDelete }) {
  const [filter, setFilter] = useState("All");
  const visibleApplications =
    filter === "All"
      ? applications
      : applications.filter((application) => application.status === filter);

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>Applications</h1>
          <p className="page-intro">Keep every opportunity moving forward.</p>
        </div>
        <Link className="button button--primary" to="/applications/new">
          Add application
        </Link>
      </div>

      <div className="filter-bar" aria-label="Filter applications by status">
        {["All", ...STATUS_OPTIONS].map((option) => (
          <button
            key={option}
            type="button"
            className={
              filter === option
                ? "filter-button filter-button--active"
                : "filter-button"
            }
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {visibleApplications.length === 0 ? (
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
          {applications.length === 0 && (
            <Link className="button button--primary" to="/applications/new">
              Add your first application
            </Link>
          )}
        </div>
      ) : (
        <div className="application-list">
          {visibleApplications.map((application) => (
            <article className="application-card" key={application.id}>
              <div className="card-main">
                <div className="card-title-row">
                  <h2>{application.jobTitle}</h2>
                  <span
                    className={`status status--${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </span>
                </div>
                <p className="company-name">{application.company}</p>
                <p className="application-date">
                  Applied {application.appliedDate}
                </p>
                {application.notes && (
                  <p className="notes">{application.notes}</p>
                )}
              </div>
              <button
                className="delete-button"
                type="button"
                onClick={() => onDelete(application.id)}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function AddApplicationPage({ onAdd }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleSubmit(values) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onAdd(values);
      navigate("/applications", { replace: true });
    } catch {
      setSubmitError("Could not save this application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-page">
      <Link className="back-link" to="/applications">
        Back to applications
      </Link>
      <p className="eyebrow">NEW RECORD</p>
      <h1>Add application</h1>
      <p className="page-intro">Capture the details while they are fresh.</p>
      <ApplicationForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onCancel={() => navigate("/applications")}
      />
    </section>
  );
}

function App() {
  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  function addApplication(values) {
    const application = { ...values, id: crypto.randomUUID() };
    setApplications((previous) => [application, ...previous]);
    return Promise.resolve(application);
  }

  function deleteApplication(id) {
    setApplications((previous) =>
      previous.filter((application) => application.id !== id),
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
                onDelete={deleteApplication}
              />
            }
          />
          <Route
            path="/applications/new"
            element={<AddApplicationPage onAdd={addApplication} />}
          />
          <Route path="*" element={<Navigate to="/applications" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
