import { render, screen, fireEvent } from "@testing-library/react";
import DeleteModal from "../../components/DeleteModal";

describe("DeleteModal Component", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const testCurrency = "USD";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal with correct currency", () => {
    const { asFragment } = render(
      <DeleteModal
        currency={testCurrency}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/USD/i)).toBeInTheDocument();
    expect(screen.getByText(/from the list/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls onConfirm when 'Delete' button is clicked", () => {
    render(
      <DeleteModal
        currency={testCurrency}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith(testCurrency);
  });

  test("calls onCancel when 'Cancel' button is clicked", () => {
    render(
      <DeleteModal
        currency={testCurrency}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test("calls onCancel when Escape key is pressed", () => {
    render(
      <DeleteModal
        currency={testCurrency}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <DeleteModal
        currency={testCurrency}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
