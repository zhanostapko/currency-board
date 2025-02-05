import { GET } from "@/app/api/not-found/route";
import React from "react";
import BalancesTable from "./BalancesTable";

const NotFoundTableContainer = async () => {
  const response = await GET();

  if (!response.ok) {
    return (
      <BalancesTable
        title="Error Table"
        error={`Error: ${response.status} ${response.statusText}`}
      />
    );
  }

  const data = await response.json();

  return <BalancesTable title="Error Table" data={data} />;
};

export default NotFoundTableContainer;
