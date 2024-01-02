"use client";
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from "@mantine/core";
import React from "react";
import { useMantineTheme } from "@mantine/core";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useMantineTheme();

  return (
    <div>
      <Container size={420} h={"80vh"} style={{ display: "grid", alignItems: "center" }}>
        {children}
      </Container>
    </div>
  );
};

export default AuthLayout;
