import { logoutAction } from "@/app/actions/logout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("logoutAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should clear the token cookie", async () => {
    const mockSet = jest.fn();
    (cookies as jest.Mock).mockReturnValue({ set: mockSet });

    await logoutAction();

    expect(mockSet).toHaveBeenCalledWith("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      path: "/",
    });
  });

  test("should redirect to /login", async () => {
    await logoutAction();
    expect(redirect).toHaveBeenCalledWith("/login");
  });
});
