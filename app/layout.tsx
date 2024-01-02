import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";

import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./layout.css";

import { theme } from "../theme";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default async function RootLayout({ children }: { children: any }) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <MantineProvider theme={theme}>
            <Notifications position={"top-center"} />
            {children}
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
