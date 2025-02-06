beforeEach(async () => {
  jest.resetModules();
  jest.doMock("../../data/currency", () => ({
    currencyMap: {
      "1": "AUD",
      "2": "RSD",
      "3": "CHF",
    },
  }));
});

describe("mapCurrencies", () => {
  test("maps known currency IDs correctly", async () => {
    const { mapCurrencies } = await import("../../utils/mapCurrency");

    const input = [
      { id: "1", amount: "100" },
      { id: "2", amount: "200" },
    ];
    const expected = [
      { id: "1", currency: "AUD", amount: "100" },
      { id: "2", currency: "RSD", amount: "200" },
    ];

    expect(mapCurrencies(input)).toEqual(expected);
  });

  test("assigns 'Unknown' to unknown currency IDs", async () => {
    const { mapCurrencies } = await import("../../utils/mapCurrency");

    const input = [{ id: "999", amount: "500" }];
    const expected = [{ id: "999", currency: "Unknown", amount: "500" }];

    expect(mapCurrencies(input)).toEqual(expected);
  });

  test("handles empty array correctly", async () => {
    const { mapCurrencies } = await import("../../utils/mapCurrency");

    expect(mapCurrencies([])).toEqual([]);
  });
});
