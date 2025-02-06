import React from "react";
import Image from "next/image";
import { BalanceItem } from "@/types/BalanceTableTypes";

type BalancesTableProps = {
  data: BalanceItem[];
  columnCount: number;
  showDeleteModal: (currency: string) => void;
  error?: string | null;
};

const BalancesTable = ({
  data,
  columnCount,
  showDeleteModal,
  error,
}: BalancesTableProps) => {
  const groupedData = data.reduce<BalanceItem[][]>((acc, item, index) => {
    const rowIndex = Math.floor(index / columnCount);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <>
      {" "}
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
                        <td className="px-6 py-4 text-gray-700 font-medium text-left">
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
    </>
  );
};

export default BalancesTable;
