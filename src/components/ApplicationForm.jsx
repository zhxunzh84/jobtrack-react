import { useState } from "react";
import {
  DEFAULT_STATUS,
  STATUS_OPTIONS,
  isValid,
  todayIso,
  validateApplication,
} from "../utils/validateApplication";
import "./ApplicationForm.css";

const EMPTY_FORM = {
  company: "",
  jobTitle: "",
  appliedDate: "",
  status: DEFAULT_STATUS,
  notes: "",
};

function ApplicationForm({
  onSubmit,
  isSubmitting = false,
  submitError = null,
  onCancel,
}) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const errors = validateApplication(values);
  const formIsValid = isValid(errors);
  const showError = (field) =>
    Boolean(errors[field]) && (touched[field] || hasSubmitted);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function handleBlur(event) {
    setTouched((previous) => ({ ...previous, [event.target.name]: true }));
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    disabled: isSubmitting,
    "aria-invalid": showError(name),
    "aria-describedby": showError(name) ? `${name}-error` : undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);
    if (!formIsValid || isSubmitting) return;
    onSubmit({
      company: values.company.trim(),
      jobTitle: values.jobTitle.trim(),
      appliedDate: values.appliedDate,
      status: values.status,
      notes: values.notes.trim(),
    });
  }

  const errorFor = (field) =>
    showError(field) ? (
      <p className="form-error" id={`${field}-error`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate>
      {submitError && (
        <p className="form-banner form-banner--error" role="alert">
          {submitError}
        </p>
      )}
      <div className="form-field">
        <label htmlFor="company">
          Name of company <span aria-hidden="true">*</span>
        </label>
        <input type="text" {...fieldProps("company")} placeholder="Citi" />
        {errorFor("company")}
      </div>
      <div className="form-field">
        <label htmlFor="jobTitle">
          Job title <span aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          {...fieldProps("jobTitle")}
          placeholder="Application Support AVP"
        />
        {errorFor("jobTitle")}
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="appliedDate">
            Date of application <span aria-hidden="true">*</span>
          </label>
          <input type="date" max={todayIso()} {...fieldProps("appliedDate")} />
          {errorFor("appliedDate")}
        </div>
        <div className="form-field">
          <label htmlFor="status">
            Status <span aria-hidden="true">*</span>
          </label>
          <select {...fieldProps("status")}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errorFor("status")}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="notes">Follow-up notes</label>
        <textarea
          rows="4"
          {...fieldProps("notes")}
          placeholder="Applied through company website. Chase up in two weeks."
        />
        {errorFor("notes")}
      </div>
      <div className="form-actions">
        <button
          type="submit"
          className="button button--primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save application"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
      {hasSubmitted && !formIsValid && (
        <p className="form-error" role="alert">
          Please fix the highlighted fields.
        </p>
      )}
    </form>
  );
}

export default ApplicationForm;
