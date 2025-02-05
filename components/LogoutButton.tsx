"use client";

import { logoutAction } from "@/app/actions/logout";
import Button from "./Shared/Button";

const LogoutButton = () => {
  return <Button onClick={() => logoutAction()}>Logout</Button>;
};

export default LogoutButton;
