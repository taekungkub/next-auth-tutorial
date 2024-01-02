"use client";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Anchor, Stack, Center } from "@mantine/core";
import { GoogleButton } from "./GoogleButton";
import { IconBrandGithub } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { LoginSchema } from "../../schemas/auth.schema";
import { GithubButton } from "./GithubButton";
import Link from "next/link";
import { register } from "@/actions/register";
import useToast from "@/hooks/useToast";

export function SignupForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: zodResolver(LoginSchema),
  });

  const toast = useToast();

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
            const data = await register(values);
            toast.success({ msg: data.success });
          } catch (error: any) {
            toast.error({ msg: error.message ?? error });
          }
        })}
      >
        <Stack>
          <TextInput required label="Name" placeholder="name" {...form.getInputProps("name")} radius="md" />

          <TextInput required label="Email" placeholder="hello@mantine.dev" {...form.getInputProps("email")} radius="md" />

          <PasswordInput required label="Password" placeholder="Your password" {...form.getInputProps("password")} radius="md" />
        </Stack>

        <Button type="submit" fullWidth mt={"md"}>
          Signup
        </Button>

        <Center>
          <Anchor href={"/auth/signin"} component={Link} type="button" c="dimmed" size="xs" mt={"md"}>
            Back to Signin
          </Anchor>
        </Center>
      </form>
    </Paper>
  );
}
