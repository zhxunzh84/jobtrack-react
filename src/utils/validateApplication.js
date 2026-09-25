export const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"];
export const DEFAULT_STATUS = "Applied";

export function todayIso() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

const isBlank = (value) => !value || !value.trim();
const isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

export function validateApplication(values) {
  const errors = {};
  if (isBlank(values.company)) errors.company = "Company is required.";
  if (isBlank(values.jobTitle)) errors.jobTitle = "Job title is required.";
  if (!STATUS_OPTIONS.includes(values.status))
    errors.status = "Choose a status.";

  if (isBlank(values.appliedDate)) {
    errors.appliedDate = "Date of application is required.";
  } else if (!isIsoDate(values.appliedDate)) {
    errors.appliedDate = "Use the date picker (YYYY-MM-DD).";
  } else if (values.appliedDate > todayIso()) {
    errors.appliedDate = "Date of application cannot be in the future.";
  }
  return errors;
}

export function isValid(errors) {
  return Object.keys(errors).length === 0;
}
