import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BalancesTableControls from "../../components/BalancesTableControls";

describe("BalancesTableControls Component", () => {
  const mockOnSearchChange = jest.fn();
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();

  const defaultProps = {
    searchQuery: "",
    onSearchChange: mockOnSearchChange,
    columnCount: 2,
    maxColumns: 5,
    increment: mockIncrement,
    decrement: mockDecrement,
    error: null,
  };

  test("renders input and buttons", () => {
    const { asFragment } = render(<BalancesTableControls {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("+ Increase")).toBeInTheDocument();
    expect(screen.getByText("- Reduce")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls onSearchChange when input is changed", () => {
    render(<BalancesTableControls {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "BTC" } });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
  });

  test("calls increment function when + button is clicked", () => {
    render(<BalancesTableControls {...defaultProps} />);
    const increaseButton = screen.getByText("+ Increase");

    fireEvent.click(increaseButton);

    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });

  test("calls decrement function when - button is clicked", () => {
    render(<BalancesTableControls {...defaultProps} />);
    const decreaseButton = screen.getByText("- Reduce");

    fireEvent.click(decreaseButton);

    expect(mockDecrement).toHaveBeenCalledTimes(1);
  });

  test("disables buttons when columnCount reaches limits", async () => {
    const { asFragment } = render(
      <BalancesTableControls {...defaultProps} columnCount={5} maxColumns={5} />
    );
    expect(screen.getByRole("button", { name: "+ Increase" })).toBeDisabled();

    render(<BalancesTableControls {...defaultProps} columnCount={1} />);

    await waitFor(() => {
      const reduceButton = screen
        .getAllByRole("button")
        .find((btn) => (btn as HTMLButtonElement).disabled);
      expect(reduceButton).toBeDisabled();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test("disables input and buttons when error exists", () => {
    const { asFragment } = render(
      <BalancesTableControls {...defaultProps} error="Test Error" />
    );
    expect(screen.getByPlaceholderText("Search")).toBeDisabled();
    expect(screen.getByText("+ Increase")).toBeDisabled();
    expect(screen.getByText("- Reduce")).toBeDisabled();
    expect(asFragment()).toMatchSnapshot();
  });
});
