import { Title } from "@mantine/core";
import React from "react";

type Props = {};

export default function UserPage({}: Props) {
  return (
    <div>
      <Title order={4} mb={"md"}>
        Users
      </Title>
    </div>
  );
}
