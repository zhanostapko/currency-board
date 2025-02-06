import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, id, ...props }: InputProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="text-gray-400 text-left text-sm font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`text-gray-600 w-full outline-none relative border rounded-lg flex items-center p-3  ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </>
  );
};

export default Input;
