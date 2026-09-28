import {
  DEFAULT_STATUS,
  isValid,
  todayIso,
  validateApplication,
} from "./validateApplication";

// TEST SUITE: Pure validation unit tests

describe("validateApplication", () => {
  const validApplication = {
    company: "Citi",
    jobTitle: "Application Support AVP",
    appliedDate: "2026-09-20",
    status: DEFAULT_STATUS,
    notes: "Follow up next week",
  };

  it("accepts a complete application with a past date", () => {
    const errors = validateApplication(validApplication);

    expect(errors).toEqual({});
    expect(isValid(errors)).toBe(true);
  });

  it("requires the company, job title, date, and status fields", () => {
    const errors = validateApplication({
      company: "",
      jobTitle: "",
      appliedDate: "",
      status: "",
      notes: "",
    });

    expect(errors).toEqual({
      company: "Company is required.",
      jobTitle: "Job title is required.",
      status: "Choose a status.",
      appliedDate: "Date of application is required.",
    });
    expect(isValid(errors)).toBe(false);
  });

  it("rejects a future application date", () => {
    const errors = validateApplication({
      ...validApplication,
      appliedDate: "2999-01-01",
    });

    expect(errors.appliedDate).toBe(
      "Date of application cannot be in the future.",
    );
  });

  it("provides today's date in ISO format", () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
