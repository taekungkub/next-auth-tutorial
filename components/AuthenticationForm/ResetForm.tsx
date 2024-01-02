"use client"
import { useForm } from "@mantine/form"
import { TextInput, Text, Paper, PaperProps, Button, Divider, Anchor, Stack, Center } from "@mantine/core"

import useToast from "@/hooks/useToast"

import { useState } from "react"
import { zodResolver } from "mantine-form-zod-resolver"
import { ResetSchema } from "@/schemas/auth.schema"
import { reset } from "@/actions/user/reset"
import Link from "next/link"

export function ResetForm(props: PaperProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      email: "test@gmail.com",
    },
    validate: zodResolver(ResetSchema),
  })

  const toast = useToast()

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Reset Password
      </Text>

      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            setIsLoading(true)
            const data = await reset(values)
            toast.success({ msg: data.success })
          } catch (error: any) {
            toast.error({ msg: error.message ?? error })
          } finally {
            setIsLoading(false)
          }
        })}
      >
        <Stack>
          <TextInput required label="Email" placeholder="hello@mantine.dev" {...form.getInputProps("email")} radius="md" />
        </Stack>

        <Button type="submit" fullWidth mt={"md"} loading={isLoading}>
          Reset
        </Button>

        <Center>
          <Anchor href={"/auth/signin"} component={Link} type="button" c="dimmed" size="xs" mt={"md"}>
            Back to Login
          </Anchor>
        </Center>
      </form>
    </Paper>
  )
}
