import React from "react";
import { GET } from "@/app/api/currencies/route";
import BalancesTableContent from "./BalancesTableContent";

const CurrenciesTableContainer = async () => {
  const response = await GET();

  if (!response.ok) {
    return (
      <BalancesTableContent
        title="Currencies Table"
        error={`Error: ${response.status} ${response.statusText}`}
      />
    );
  }

  const data = await response?.json();

  return <BalancesTableContent title="Currencies Table" data={data} />;
};

export default CurrenciesTableContainer;
