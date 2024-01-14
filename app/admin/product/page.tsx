import ProductsTable from "@/components/ProductTable"
import { getAllProduct } from "@/data/product"
import { Title } from "@mantine/core"
import React from "react"

export default async function ProductPage() {
  const data = await getAllProduct()
  return (
    <div>
      <Title order={4} mb={"md"}>
        Products
      </Title>
      <ProductsTable data={data || []} />
    </div>
  )
}
