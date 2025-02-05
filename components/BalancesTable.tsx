"use client";
import { BalanceItem } from "@/types/BalanceTableTypes";
import React, { useState } from "react";
import Button from "./Shared/Button";
import Input from "./Shared/Input";
import DeleteModal from "./DeleteModal";
import Image from "next/image";

type BalancesTableContentProps = {
  data?: BalanceItem[];
  columns?: number;
  error?: string | null;
  title: string;
};

const BalancesTableContent = ({
  data = [],
  error,
  title,
}: BalancesTableContentProps) => {
  const [columnCount, setColumnCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [balances, setBalances] = useState<BalanceItem[]>(data);
  const [showModal, setShowModal] = useState(false);
  const [currencyToDelete, setCurrencyToDelete] = useState<string>("");

  const increment = () => setColumnCount((prev) => Math.min(5, prev + 1));
  const decrement = () => setColumnCount((prev) => Math.max(1, prev - 1));

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrencyToDelete("");
  };

  const showDeleteModal = (currency: string) => {
    setCurrencyToDelete(currency);
    setShowModal(true);
  };

  const handleDelete = (currency: string) => {
    setBalances((prev) => prev.filter((item) => item.currency !== currency));
    closeModal();
  };

  const filteredData = balances.filter((item) =>
    item.currency.includes(searchQuery.toUpperCase())
  );

  const groupedData = filteredData.reduce<BalanceItem[][]>(
    (acc, item, index) => {
      const rowIndex = Math.floor(index / columnCount);
      if (!acc[rowIndex]) acc[rowIndex] = [];
      acc[rowIndex].push(item);
      return acc;
    },
    []
  );

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <Input
            disabled={!!error}
            value={searchQuery}
            onChange={searchHandler}
            placeholder="Search"
            className="w-64 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
          />
          <div className="flex gap-4">
            <Button
              className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
              disabled={columnCount >= 5 || !!error}
              onClick={increment}
            >
              + Expand
            </Button>
            <Button
              className="px-5 py-2.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
              disabled={columnCount <= 1 || !!error}
              onClick={decrement}
            >
              - Reduce
            </Button>
          </div>
        </div>

        {error ? (
          <div className="w-full border border-red-500 bg-red-50 text-red-700 text-center font-medium p-4 rounded-md">
            ❌ Failed to fetch data. Please try again later.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-sm table-fixed">
              <thead>
                <tr className="bg-gray-200 text-gray-900 text-lg font-semibold">
                  {Array.from({ length: columnCount }, (_, i) => (
                    <React.Fragment key={i}>
                      <th className="px-6 py-4 text-left">Currency</th>
                      <th className="px-6 py-4 text-right">Balance</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupedData.length > 0 ? (
                  groupedData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="even:bg-gray-100 hover:bg-gray-200 transition"
                    >
                      {row.map(({ currency, amount }) => (
                        <React.Fragment key={currency}>
                          <td className="px-6 py-4 text-gray-700 font-medium text-left ">
                            {currency}
                          </td>
                          <td className="px-6 py-4 text-gray-700 font-medium flex justify-end items-center gap-2">
                            {amount}
                            <button
                              onClick={() => showDeleteModal(currency)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <Image
                                src="trashIcon.svg"
                                alt="Delete"
                                width="14"
                                height="14"
                              />
                            </button>
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columnCount * 2}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      🔎 No balances found for your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={closeModal}
          currency={currencyToDelete}
        />
      )}
    </>
  );
};

export default BalancesTableContent;
