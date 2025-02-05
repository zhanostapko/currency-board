import CurrenciesTableContainer from "@/components/CurrenciesTableContainer";
import NotFoundTableContainer from "@/components/NotFoundTableContainer";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

const BalancesTablePage = async () => {
  return (
    <div className=" flex flex-col gap-y-8">
      <div className="flex justify-center items-center min-h-[300px] ">
        <Suspense fallback={<Spinner />}>
          <CurrenciesTableContainer />
        </Suspense>
      </div>
      <div className="flex justify-center items-center min-h-[200px]  w-full ">
        <Suspense fallback={<Spinner />}>
          <NotFoundTableContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default BalancesTablePage;
