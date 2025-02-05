import React, { PropsWithChildren } from "react";

type Props = {
  title: string;
  subtitle: string;
};

const AuthFormWrapper = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
