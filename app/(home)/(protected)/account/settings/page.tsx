"use client"
import { logout } from "@/actions/user/logout"
import { ChangePasswordForm } from "@/components/AccountSettings/ChangePasswordForm"
import { SettingsForm } from "@/components/AccountSettings/SettingsForm"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Button, Flex, Paper, Text, Title } from "@mantine/core"
import { IconBrandGuardian, IconShield, IconUser } from "@tabler/icons-react"
import React from "react"

export default function SettingsPage() {
  const user = useCurrentUser()
  return (
    <Paper withBorder p={"md"}>
      <Flex align={"center"} mb={"md"} gap={"xs"}>
        <IconUser />
        <Title order={4}>ข้อมูลส่วนตัว</Title>
      </Flex>
      <SettingsForm user={user} />

      <Flex align={"center"} mb={"md"} gap={"xs"}>
        <IconShield />
        <Title order={4}>เปลี่ยนรหัสผ่าน</Title>
      </Flex>
      <ChangePasswordForm />
    </Paper>
  )
}
