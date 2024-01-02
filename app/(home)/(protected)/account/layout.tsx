"use client"
import { Box, Button, Container, Flex, Paper, SimpleGrid, Stack, Tabs } from "@mantine/core"
import { IconAddressBook, IconBook, IconHeart, IconUser } from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function AccountLayout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Container>
      <Paper withBorder p={"md"}>
        <Flex gap={"md"} align="flex-start" wrap="nowrap">
          <Button variant={pathname === "/account/settings" ? "" : "subtle"} leftSection={<IconUser />} onClick={() => router.push("/account/settings")}>
            บัญชีของฉัน
          </Button>
          <Button variant={pathname === "/account/address" ? "" : "subtle"} leftSection={<IconAddressBook />} onClick={() => router.push("/account/address")}>
            ที่อยู่
          </Button>
          <Button variant={pathname === "/account/favorite" ? "" : "subtle"} leftSection={<IconHeart />} onClick={() => router.push("/account/favorite")}>
            สินค้าที่ชอบ
          </Button>
        </Flex>
      </Paper>
      <Box mt={"md"}>{children}</Box>
    </Container>
  )
}
