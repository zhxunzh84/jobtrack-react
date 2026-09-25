import { useState } from "react"
import { Link, useNavigate } from "react-router"
import ApplicationForm from "../components/ApplicationForm"

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

export default AddApplicationPage;