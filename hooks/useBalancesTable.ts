"use client";
import { useState, useEffect } from "react";
import { BalanceItem } from "@/types/BalanceTableTypes";

export const useBalancesTable = (data: BalanceItem[] = []) => {
  const [columnCount, setColumnCount] = useState(1);
  const [maxColumns, setMaxColumns] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [balances, setBalances] = useState<BalanceItem[]>(data);
  const [showModal, setShowModal] = useState(false);
  const [currencyToDelete, setCurrencyToDelete] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(1);
        setMaxColumns(1);
      } else if (width < 1024) {
        setColumnCount(2);
        setMaxColumns(3);
      } else if (width < 1280) {
        setColumnCount(3);
        setMaxColumns(5);
      } else {
        setColumnCount(4);
        setMaxColumns(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const increment = () =>
    setColumnCount((prev) => Math.min(maxColumns, prev + 1));
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

  return {
    columnCount,
    maxColumns,
    searchQuery,
    balances,
    showModal,
    currencyToDelete,
    setSearchQuery,
    increment,
    decrement,
    showDeleteModal,
    handleDelete,
    closeModal,
    filteredData,
    searchHandler,
  };
};
