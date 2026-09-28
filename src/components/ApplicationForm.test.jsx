import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationForm from "./ApplicationForm";

// TEST SUITE: User-facing application form integration tests

describe("ApplicationForm", () => {
  it("shows validation feedback when submitted empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ApplicationForm onSubmit={onSubmit} />);
    await user.click(screen.getByRole("button", { name: "Save application" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please fix the highlighted fields.",
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits trimmed application values when valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ApplicationForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/Name of company/i), "  Citi  ");
    await user.type(
      screen.getByLabelText(/Job title/i),
      "  Support Engineer  ",
    );
    await user.type(
      screen.getByLabelText(/Date of application/i),
      "2026-09-20",
    );
    await user.type(screen.getByLabelText("Follow-up notes"), "  Follow up  ");
    await user.click(screen.getByRole("button", { name: "Save application" }));

    expect(onSubmit).toHaveBeenCalledWith({
      company: "Citi",
      jobTitle: "Support Engineer",
      appliedDate: "2026-09-20",
      status: "Applied",
      notes: "Follow up",
    });
  });

  it("displays a POST submission error from the parent", () => {
    render(
      <ApplicationForm
        onSubmit={vi.fn()}
        submitError="Could not save this application. Please try again."
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Could not save this application. Please try again.",
    );
  });
});
