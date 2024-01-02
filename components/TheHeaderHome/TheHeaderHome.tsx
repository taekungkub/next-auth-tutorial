"use client"
import React from "react"
import { AppShell, Text, Burger, useMantineTheme, Flex, Box, Group, Container } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import MenuDropdownProfile from "@/components/TheHeaderHome/MenuDropdownProfile"
import ButtonCart from "@/components/TheHeaderHome/ButtonCart"

type Props = {}

export default function TheHeaderHome({}: Props) {
  const theme = useMantineTheme()
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)

  return (
    <Box h={"60px"}>
      <Flex wrap={"nowrap"} justify={"space-between"} h={"100%"} align={"center"} p={"md"}>
        <Box>
          <Text component="a" href="/home" fw={"bold"}>
            Mantine.dev
          </Text>
        </Box>
        <Flex gap={"lg"}>
          <ButtonCart />
          <MenuDropdownProfile />
        </Flex>
      </Flex>
    </Box>
  )
}
