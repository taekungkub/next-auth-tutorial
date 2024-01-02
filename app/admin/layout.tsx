"use client"
import { TheSidebar } from "@/app/admin/_components/TheSidebar/TheSidebar"
import { AppShell, Container } from "@mantine/core"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <TheSidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
    </AppShell>
  )
}
