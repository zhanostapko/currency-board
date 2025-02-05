import React from "react";
import Spinner from "../Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({ loading, children, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 flex justify-center items-center`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner size={22} /> : children}
    </button>
  );
};

export default Button;
