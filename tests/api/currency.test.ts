import { GET } from "../../app/api/currencies/route";
import { mapCurrencies } from "../../utils/mapCurrency";

jest.mock("../../utils/mapCurrency");

global.fetch = jest.fn();
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, { status }) => ({ json: async () => data, status })),
  },
}));

describe("GET handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns mapped data on success", async () => {
    const mockData = [
      { id: "1", amount: "100" },
      { id: "2", amount: "200" },
    ];

    const mappedData = [
      { id: "1", currency: "USD", amount: "100" },
      { id: "2", currency: "EUR", amount: "200" },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    (mapCurrencies as jest.Mock).mockReturnValue(mappedData);

    const response = await GET();
    const result = await response.json();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mapCurrencies).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mappedData);
    expect(response.status).toBe(200);
  });

  test("returns 500 when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const response = await GET();
    const result = await response.json();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ statusText: "Failed to fetch data from API" });
    expect(response.status).toBe(500);
  });

  test("returns 500 when fetch throws an error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const response = await GET();
    const result = await response.json();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ error: "Network error" });
    expect(response.status).toBe(500);
  });
});
