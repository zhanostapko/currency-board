import React from "react";
import BalancesTable from "./BalancesTable";
import { GET } from "@/app/api/currencies/route";

const CurrenciesTableContainer = async () => {
  const response = await GET();

  if (!response.ok) {
    return (
      <BalancesTable
        title="Currencies Table"
        error={`Error: ${response.status} ${response.statusText}`}
      />
    );
  }

  const data = await response?.json();

  return <BalancesTable title="Currencies Table" data={data} />;
};

export default CurrenciesTableContainer;
