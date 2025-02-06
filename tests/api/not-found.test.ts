import { GET } from "../../app/api/not-found/route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, { status }) => ({
      json: async () => data,
      status,
    })),
  },
}));

describe("GET handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns 404 error with correct message", async () => {
    const response = await GET();
    const result = await response.json();

    expect(result).toEqual({ error: "Resource not found" });
    expect(response.status).toBe(404);
  });
});
