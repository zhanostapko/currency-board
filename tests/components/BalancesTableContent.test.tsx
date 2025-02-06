import { render, screen, fireEvent } from "@testing-library/react";
import BalancesTableContent from "../../components/BalancesTableContent";
import { useBalancesTable } from "@/hooks/useBalancesTable";

jest.mock("../../hooks/useBalancesTable.ts");

describe("BalancesTableContent Component", () => {
  const mockUseBalancesTable = {
    columnCount: 2,
    maxColumns: 5,
    searchQuery: "",
    filteredData: [
      { currency: "USD", amount: 100 },
      { currency: "EUR", amount: 200 },
    ],
    increment: jest.fn(),
    decrement: jest.fn(),
    showDeleteModal: jest.fn(),
    handleDelete: jest.fn(),
    closeModal: jest.fn(),
    showModal: false,
    currencyToDelete: "",
    searchHandler: jest.fn(),
  };

  beforeEach(() => {
    (useBalancesTable as jest.Mock).mockReturnValue(mockUseBalancesTable);
  });

  test("renders correctly and matches snapshot", () => {
    const { asFragment } = render(<BalancesTableContent title="Balances" />);
    expect(screen.getByText("Balances")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("passes correct props to BalancesTableControls", () => {
    render(<BalancesTableContent title="Balances" />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("+ Increase")).toBeInTheDocument();
    expect(screen.getByText("- Reduce")).toBeInTheDocument();
  });

  test("renders table with filtered data", () => {
    const { asFragment } = render(<BalancesTableContent title="Balances" />);
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders error message when error is passed", () => {
    const { asFragment } = render(
      <BalancesTableContent title="Balances" error="Test error" />
    );
    expect(
      screen.getByText("❌ Failed to fetch data. Please try again later.")
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows delete modal when showModal is true", () => {
    (useBalancesTable as jest.Mock).mockReturnValue({
      ...mockUseBalancesTable,
      showModal: true,
      currencyToDelete: "USD",
    });

    const { asFragment } = render(<BalancesTableContent title="Balances" />);
    expect(
      screen.getByText(/Are you sure you want to delete/i)
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls increment and decrement functions", () => {
    render(<BalancesTableContent title="Balances" />);

    fireEvent.click(screen.getByText("+ Increase"));
    fireEvent.click(screen.getByText("- Reduce"));

    expect(mockUseBalancesTable.increment).toHaveBeenCalledTimes(1);
    expect(mockUseBalancesTable.decrement).toHaveBeenCalledTimes(1);
  });
});
