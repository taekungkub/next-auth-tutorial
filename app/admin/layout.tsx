
import ProductLayout from "@/app/admin/components/ProductLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return <ProductLayout>{children}</ProductLayout>
}
