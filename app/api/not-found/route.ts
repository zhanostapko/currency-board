import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((res) => setTimeout(res, 1000));
  return NextResponse.json(
    { error: "Resource not found" },
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}
