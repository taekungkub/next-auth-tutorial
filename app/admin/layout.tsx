
import AdminLayout from "./components/AdminLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AdminLayout>{children}</AdminLayout>
}
