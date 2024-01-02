"use client"
import React from "react"
import { AppShell, Box, Burger, Container, Group, LoadingOverlay, ScrollArea, Skeleton, rem, useMantineTheme } from "@mantine/core"
import TheHeaderHome from "@/components/TheHeaderHome/TheHeaderHome"

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div>
      <Box pos="relative">
        <AppShell padding="md" header={{ height: 60 }}>
          <AppShell.Header>
            <TheHeaderHome />
          </AppShell.Header>
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </Box>
    </div>
  )
}
