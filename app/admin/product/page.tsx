import ProductsTable from "@/app/admin/components/ProductTable";
import { getAllProduct } from "@/data/product";
import { Title } from "@mantine/core";
import React from "react";

type Props = {};

export default async function ProductPage({}: Props) {
  const data = await getAllProduct();
  return (
    <div>
      <Title order={4} mb={"md"}>
        Products
      </Title>
      <ProductsTable data={data || []} />
    </div>
  );
}
