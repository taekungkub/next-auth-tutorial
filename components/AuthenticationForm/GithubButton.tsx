import { Button, ButtonProps } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return <Button leftSection={<IconBrandGithub />} variant="default" {...props} />;
}
