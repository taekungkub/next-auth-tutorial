"use client"
import { useForm } from "@mantine/form"
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Anchor, Stack, Center, Flex, Box } from "@mantine/core"
import { zodResolver } from "mantine-form-zod-resolver"
import { ChangeNewPasswordSchema, LoginSchema } from "../../schemas/auth.schema"
import useToast from "@/hooks/useToast"

import { useState } from "react"
import { updatePassword } from "@/actions/user/update-password"

export function ChangePasswordForm(props: PaperProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      password: "",
      new_password: "",
      confirm_new_password: "",
    },

    validate: zodResolver(ChangeNewPasswordSchema),
  })

  const toast = useToast()

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setIsLoading(true)
          updatePassword(values)
            .then((data) => {
              if (data.success) {
                toast.success({ msg: data.success })
              }
              if (data.error) {
                toast.error({ msg: data.error })
              }
            })
            .finally(() => {
              setIsLoading(false)
            })
        })}
      >
        <Stack>
          <PasswordInput required label="รหัสผ่าน" {...form.getInputProps("password")} radius="md" />
          <PasswordInput required label="รหัสผ่านใหม่" {...form.getInputProps("new_password")} radius="md" />
          <PasswordInput required label="ยืนยันรหัสผ่านใหม่" {...form.getInputProps("confirm_new_password")} radius="md" />
        </Stack>

        <Flex justify={"end"}>
          <Button type="submit" mt={"md"} loading={isLoading}>
            เปลี่ยนรหัสผ่าน
          </Button>
        </Flex>
      </form>
    </Box>
  )
}
