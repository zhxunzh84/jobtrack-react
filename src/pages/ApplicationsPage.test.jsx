import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationsPage from "./ApplicationsPage";

// TEST SUITE: Application list and status-filter integration tests

const applications = [
  {
    id: "1",
    company: "Citi",
    jobTitle: "Support Engineer",
    appliedDate: "2026-09-20",
    status: "Applied",
    notes: "Follow up next week",
  },
  {
    id: "2",
    company: "UOB",
    jobTitle: "AI DevOps",
    appliedDate: "2026-09-18",
    status: "Interview",
    notes: "Interview scheduled",
  },
];

describe("ApplicationsPage", () => {
  it("renders applications received from shared App state", () => {
    render(
      <ApplicationsPage
        applications={applications}
        loading={false}
        error=""
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Citi" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "UOB" })).toBeInTheDocument();
  });

  it("filters applications by status", async () => {
    const user = userEvent.setup();

    render(
      <ApplicationsPage
        applications={applications}
        loading={false}
        error=""
        onDelete={vi.fn()}
      />,
    );

    await user.selectOptions(
      screen.getByLabelText("Filter by status"),
      "Interview",
    );

    expect(screen.getByRole("heading", { name: "UOB" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Citi" }),
    ).not.toBeInTheDocument();
  });

  it("shows loading and GET error states", () => {
    const { rerender } = render(
      <ApplicationsPage
        applications={[]}
        loading={true}
        error=""
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Loading applications...")).toBeInTheDocument();

    rerender(
      <ApplicationsPage
        applications={[]}
        loading={false}
        error="Failed to load applications"
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Failed to load applications")).toBeInTheDocument();
  });
});
