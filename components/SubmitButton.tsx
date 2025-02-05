"use client";

import { useFormStatus } from "react-dom";
import Button from "./Shared/Button";

type Props = {
  title: string;
};

const SubmitButton = ({ title }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      loading={pending}
      className="bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition"
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
