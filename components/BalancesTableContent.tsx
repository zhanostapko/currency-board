"use client";
import BalancesTableControls from "./BalancesTableControls";
import BalancesTable from "./BalancesTable";
import DeleteModal from "./DeleteModal";
import { useBalancesTable } from "@/hooks/useBalancesTable";
import { BalanceItem } from "@/types/BalanceTableTypes";

export type BalancesTableContentProps = {
  data?: BalanceItem[];
  error?: string | null;
  title: string;
};

const BalancesTableContent = ({
  data = [],
  error,
  title,
}: BalancesTableContentProps) => {
  const {
    columnCount,
    maxColumns,
    searchQuery,
    filteredData,
    increment,
    decrement,
    showDeleteModal,
    handleDelete,
    closeModal,
    showModal,
    currencyToDelete,
    searchHandler,
  } = useBalancesTable(data);

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      <BalancesTableControls
        {...{
          searchQuery,
          onSearchChange: searchHandler,
          columnCount,
          maxColumns,
          increment,
          decrement,
          error,
        }}
      />
      <BalancesTable
        {...{ data: filteredData, columnCount, showDeleteModal, error }}
      />
      {showModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={closeModal}
          currency={currencyToDelete}
        />
      )}
    </div>
  );
};

export default BalancesTableContent;
