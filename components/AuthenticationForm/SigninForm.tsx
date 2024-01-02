"use client"
import { useForm } from "@mantine/form"
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Anchor, Stack, Center, Flex } from "@mantine/core"
import { GoogleButton } from "./GoogleButton"
import { zodResolver } from "mantine-form-zod-resolver"
import { LoginSchema } from "../../schemas/auth.schema"
import { GithubButton } from "./GithubButton"
import Link from "next/link"
import useToast from "@/hooks/useToast"
import { login } from "@/actions/user/login"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export function SigninForm(props: PaperProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      email: "test@gmail.com",
      password: "123456",
    },

    validate: zodResolver(LoginSchema),
  })

  const toast = useToast()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>

        <GithubButton radius="xl">Github</GithubButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            setIsLoading(true)
            await login(values, callbackUrl)
          } catch (error: any) {
            toast.error({ msg: error.message ?? error })
          } finally {
            setIsLoading(false)
          }
        })}
      >
        <Stack>
          <TextInput required label="Email" placeholder="hello@mantine.dev" {...form.getInputProps("email")} radius="md" />

          <PasswordInput required label="Password" placeholder="Your password" {...form.getInputProps("password")} radius="md" />
        </Stack>

        <Flex justify={"end"}>
          <Anchor href={"/auth/reset"} component={Link} type="button" c="dimmed" size="xs" mt={"md"}>
            Forgot Password?
          </Anchor>
        </Flex>

        <Button type="submit" fullWidth mt={"md"} loading={isLoading}>
          Signin
        </Button>

        <Center>
          <Anchor href={"/auth/signup"} component={Link} type="button" c="dimmed" size="xs" mt={"md"}>
            Dont have an account? Register
          </Anchor>
        </Center>
      </form>
    </Paper>
  )
}
