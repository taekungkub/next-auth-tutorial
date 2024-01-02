import { notifications } from "@mantine/notifications";

export default function useToast() {
  function success({ title, msg }: { title?: string; msg?: string }) {
    notifications.show({
      color: "teal",
      title: title,
      message: msg,
    });
  }

  function error({ title, msg }: { title?: string; msg?: string }) {
    notifications.show({
      color: "red",
      title: title,
      message: msg,
    });
  }

  return {
    success,
    error,
  };
}
