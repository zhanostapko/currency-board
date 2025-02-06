import { GET } from "@/app/api/not-found/route";
import React from "react";
import BalancesTableContent from "./BalancesTableContent";

const NotFoundTableContainer = async () => {
  const response = await GET();

  if (!response.ok) {
    return (
      <BalancesTableContent
        title="Error Table"
        error={`Error: ${response.status} ${response.statusText}`}
      />
    );
  }

  const data = await response.json();

  return <BalancesTableContent title="Error Table" data={data} />;
};

export default NotFoundTableContainer;
