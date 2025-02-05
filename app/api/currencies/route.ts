import { currencyMap } from "@/data/currency";

export async function GET() {
  await new Promise((res) => setTimeout(res, 1500));
  try {
    const response = await fetch(
      "https://67862af6f80b78923aa5ace3.mockapi.io/api/v1/balance",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json(
        { statusText: "Failed to fetch data from API" },
        { status: 500 }
      );
    }

    const data = await response.json();

    const mappedData = data.map((item: { id: string; amount: string }) => ({
      id: item.id,
      currency: currencyMap[item.id] || "Unknown",
      amount: item.amount,
    }));

    return Response.json(mappedData, { status: 200 });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
