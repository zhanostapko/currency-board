import Spinner from "@/components/Spinner";
import React from "react";

const loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
      <Spinner />
    </div>
  );
};

export default loading;
