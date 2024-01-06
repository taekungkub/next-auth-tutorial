import ProductsTable from "@/app/admin/components/ProductTable";
import { getAllProduct } from "@/data/product";
import { Title } from "@mantine/core";
import React from "react";


export default async function ProductPage() {
  const data = await getAllProduct();
  console.log(data)
  return (
    <div>
      <Title order={4} mb={"md"}>
        Products
      </Title>
      <ProductsTable data={data || []} />
    </div>
  );
}
