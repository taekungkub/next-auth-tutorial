"use client"
import { useForm } from "@mantine/form"
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Anchor, Stack, Center, Flex, Box, Avatar } from "@mantine/core"
import { zodResolver } from "mantine-form-zod-resolver"
import { SettingsSchema } from "../../schemas/auth.schema"
import useToast from "@/hooks/useToast"
import { useState } from "react"
import { ExtendedUser } from "@/types/next-auth"
import { settings } from "@/actions/user/settings"

interface Props {
  user: ExtendedUser | undefined
}

export function SettingsForm({ user }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      tel: user?.tel || "",
    },

    validate: zodResolver(SettingsSchema),
  })

  const toast = useToast()

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setIsLoading(true)

          settings(values)
            .then((data) => {
              if (data.success) {
                toast.success({ msg: data.success })
              }
              if (data.error) {
                toast.error({ msg: data.error })
              }
            })
            .catch(() => {})
            .finally(() => {
              setIsLoading(false)
            })
        })}
      >
        <Stack>
          <TextInput required label="ชื่อ-สกุล" {...form.getInputProps("name")} radius="md" />
          <TextInput disabled readOnly label="อีเมล" {...form.getInputProps("email")} radius="md" />
          <TextInput label="เบอร์ติดต่อ" {...form.getInputProps("tel")} type="number" radius="md" />
        </Stack>

        <Flex justify={"end"}>
          <Button type="submit" mt={"md"} loading={isLoading}>
            บันทึก
          </Button>
        </Flex>
      </form>
    </Box>
  )
}
