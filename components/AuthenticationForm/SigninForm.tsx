"use client";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Anchor, Stack, Center } from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { zodResolver } from "mantine-form-zod-resolver";
import { LoginSchema } from "../../schemas/auth.schema";
import { GithubButton } from "./GithubButton";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";

export function SigninForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: "taekungkub16@gmail.com",
      password: "123456",
    },

    validate: zodResolver(LoginSchema),
  });

  const toast = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

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
            await login(values, callbackUrl);
          } catch (error: any) {
            toast.error({ msg: error.message ?? error });
          }
        })}
      >
        <Stack>
          <TextInput required label="Email" placeholder="hello@mantine.dev" {...form.getInputProps("email")} radius="md" />

          <PasswordInput required label="Password" placeholder="Your password" {...form.getInputProps("password")} radius="md" />
        </Stack>

        <Button type="submit" fullWidth mt={"md"}>
          Signin
        </Button>

        <Center>
          <Anchor href={"/auth/signup"} component={Link} type="button" c="dimmed" size="xs" mt={"md"}>
            Dont have an account? Register
          </Anchor>
        </Center>
      </form>
    </Paper>
  );
}
