import { NextResponse } from "next/server";
import { mapCurrencies } from "@/utils/mapCurrency";

export async function GET() {
  try {
    const response = await fetch(process.env.API_ENDPOINT!, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { statusText: "Failed to fetch data from API" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const mappedData = mapCurrencies(data);

    return NextResponse.json(mappedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
