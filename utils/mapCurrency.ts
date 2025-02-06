import { currencyMap } from "@/data/currency";

export function mapCurrencies(data: { id: string; amount: string }[]) {
  return data.map((item) => ({
    id: item.id,
    currency: currencyMap[item.id] || "Unknown",
    amount: item.amount,
  }));
}
