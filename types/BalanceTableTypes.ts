export type BalanceItem = {
  id: string;
  currency: string;
  amount: string;
};

export type BalancesTableProps = {
  data: BalanceItem[];
  columnCount: number;
  showDeleteModal: (currency: string) => void;
};
