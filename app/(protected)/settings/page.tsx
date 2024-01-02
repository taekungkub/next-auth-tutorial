"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@mantine/core";
import React from "react";

export default function SettingsPage() {
  const user = useCurrentUser();
  return (
    <div>
      SettingsPage
      {JSON.stringify(user)}
      {user && (
        <Button color="red" variant={"outline"} onClick={() => logout()}>
          Logout
        </Button>
      )}
    </div>
  );
}
