import React from "react"
import { Box, Title } from "@mantine/core"
import ProductAddForm from "@/components/ProductAddForm/ProductAddForm"

export default async function Page() {
  const initProduct: any = {
    title: "",
    description: "",
    sku: "",
    price: 0,
    stock: 0,
    category: "",
    tags: "",
    vendor: "",
    brand: "",
    images: [],
  }

  return (
    <div>
      <Title order={4}></Title>

      {/* <PageTitle title="Add New Product" subtitle="Section to config basic product information"></PageTitle> */}

      <Box mt={20}>
        <ProductAddForm type={"ADD"} />
      </Box>
    </div>
  )
}
