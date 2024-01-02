"use client"
import { useForm } from "@mantine/form"
import { PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Anchor, Stack, Center } from "@mantine/core"
import { GoogleButton } from "./GoogleButton"
import { zodResolver } from "mantine-form-zod-resolver"
import { LoginSchema, NewPasswordSchema } from "../../schemas/auth.schema"
import { GithubButton } from "./GithubButton"
import { useState } from "react"
import { newPassword } from "@/actions/user/new-password"
import Link from "next/link"
import useToast from "@/hooks/useToast"
import { useSearchParams } from "next/navigation"

export function NewPasswordForm(props: PaperProps) {
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const form = useForm({
    initialValues: {
      password: "",
      confirm_password: "",
    },

    validate: zodResolver(NewPasswordSchema),
  })

  const toast = useToast()

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        New Password
      </Text>

      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            setIsLoading(true)
            const data = await newPassword(values, token)
            if (data.success) {
              toast.success({ msg: data.success })
            }

            if (data.error) {
              toast.error({ msg: data.error })
            }
          } catch (error: any) {
          } finally {
            setIsLoading(false)
          }
        })}
      >
        <Stack>
          <PasswordInput required label="Password" placeholder="Your password" {...form.getInputProps("password")} radius="md" />
          <PasswordInput required label="Confirm Password" placeholder="Confirm Your password" {...form.getInputProps("confirm_password")} radius="md" />
        </Stack>

        <Button type="submit" fullWidth mt={"md"} loading={isLoading}>
          Create New Password
        </Button>
      </form>
    </Paper>
  )
}
