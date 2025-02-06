import { renderHook, act } from "@testing-library/react";
import { useBalancesTable } from "../../hooks/useBalancesTable";
import { BalanceItem } from "../../types/BalanceTableTypes";

describe("useBalancesTable hook", () => {
  const mockData: BalanceItem[] = [
    { id: "1", currency: "USD", amount: "100" },
    { id: "2", currency: "EUR", amount: "200" },
    { id: "3", currency: "GBP", amount: "300" },
  ];

  test("initializes with correct default values", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    const { result } = renderHook(() => useBalancesTable(mockData));
    expect(result.current.columnCount).toBe(1);
    expect(result.current.maxColumns).toBe(1);
    expect(result.current.searchQuery).toBe("");
    expect(result.current.balances).toEqual(mockData);
    expect(result.current.showModal).toBe(false);
    expect(result.current.currencyToDelete).toBe("");
    expect(result.current.filteredData).toEqual(mockData);
  });

  test("increments and decrements columnCount correctly", () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));

    const { result } = renderHook(() => useBalancesTable(mockData));
    expect(result.current.columnCount).toBe(3);

    act(() => result.current.increment());
    expect(result.current.columnCount).toBe(4);

    act(() => result.current.decrement());
    expect(result.current.columnCount).toBe(3);
  });

  test("does not exceed maxColumns when incrementing", () => {
    const { result } = renderHook(() => useBalancesTable(mockData));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.columnCount).toBe(result.current.maxColumns);
  });

  test("does not decrement columnCount below 1", () => {
    const { result } = renderHook(() => useBalancesTable(mockData));

    act(() => {
      result.current.decrement();
      result.current.decrement();
    });

    expect(result.current.columnCount).toBe(1);
  });

  test("filters balances based on search query", () => {
    const { result } = renderHook(() => useBalancesTable(mockData));

    act(() => result.current.setSearchQuery("EUR"));

    expect(result.current.filteredData).toEqual([
      { id: "2", currency: "EUR", amount: "200" },
    ]);
  });

  test("opens and closes delete modal correctly", () => {
    const { result } = renderHook(() => useBalancesTable(mockData));

    act(() => result.current.showDeleteModal("EUR"));
    expect(result.current.showModal).toBe(true);
    expect(result.current.currencyToDelete).toBe("EUR");

    act(() => result.current.closeModal());
    expect(result.current.showModal).toBe(false);
    expect(result.current.currencyToDelete).toBe("");
  });

  test("deletes currency and updates balances correctly", () => {
    const { result } = renderHook(() => useBalancesTable(mockData));

    act(() => result.current.handleDelete("EUR"));

    expect(result.current.balances).toEqual([
      { id: "1", currency: "USD", amount: "100" },
      { id: "3", currency: "GBP", amount: "300" },
    ]);
    expect(result.current.showModal).toBe(false);
  });

  test("updates column count based on window resize", () => {
    const { result } = renderHook(() => useBalancesTable(mockData));

    act(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.columnCount).toBe(1);
    expect(result.current.maxColumns).toBe(1);

    act(() => {
      global.innerWidth = 900;
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.columnCount).toBe(2);
    expect(result.current.maxColumns).toBe(3);

    act(() => {
      global.innerWidth = 1200;
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.columnCount).toBe(3);
    expect(result.current.maxColumns).toBe(5);
  });
});
