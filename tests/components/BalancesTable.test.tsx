import { render, screen, fireEvent } from "@testing-library/react";
import BalancesTable from "../../components/BalancesTable";
import { BalanceItem } from "../../types/BalanceTableTypes";

describe("BalancesTable Component", () => {
  const mockData: BalanceItem[] = [
    { id: "1", currency: "USD", amount: "100" },
    { id: "2", currency: "EUR", amount: "200" },
  ];
  const mockShowDeleteModal = jest.fn();

  test("renders table with data", () => {
    const { asFragment } = render(
      <BalancesTable
        data={mockData}
        columnCount={2}
        showDeleteModal={mockShowDeleteModal}
      />
    );

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows error message when error prop is passed", () => {
    const { asFragment } = render(
      <BalancesTable
        data={mockData}
        columnCount={2}
        showDeleteModal={mockShowDeleteModal}
        error="Test error"
      />
    );

    expect(
      screen.getByText("❌ Failed to fetch data. Please try again later.")
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls showDeleteModal on delete button click", () => {
    const { asFragment } = render(
      <BalancesTable
        data={mockData}
        columnCount={2}
        showDeleteModal={mockShowDeleteModal}
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(mockShowDeleteModal).toHaveBeenCalledWith("USD");
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders empty state when no data is provided", () => {
    const { asFragment } = render(
      <BalancesTable
        data={[]}
        columnCount={2}
        showDeleteModal={mockShowDeleteModal}
      />
    );

    expect(
      screen.getByText("🔎 No balances found for your search.")
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
