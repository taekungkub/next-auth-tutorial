import { Container } from "@mantine/core"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return <Container>{children}</Container>
}
