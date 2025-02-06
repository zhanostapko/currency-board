import Button from "./Shared/Button";
import Input from "./Shared/Input";

type BalancesTableControlsProps = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  columnCount: number;
  maxColumns: number;
  increment: () => void;
  decrement: () => void;
  error?: string | null;
};

const BalancesTableControls = ({
  searchQuery,
  onSearchChange,
  columnCount,
  maxColumns,
  increment,
  decrement,
  error,
}: BalancesTableControlsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
      <Input
        disabled={!!error}
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search"
        className="w-64 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
      />
      <div className="flex gap-4">
        <Button
          className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
          disabled={columnCount >= maxColumns || !!error}
          onClick={increment}
        >
          + Increase
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
  );
};

export default BalancesTableControls;
