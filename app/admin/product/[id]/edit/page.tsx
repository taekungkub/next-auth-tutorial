import FormAddProduct from "@/components/ProductAddForm/ProductAddForm";
import { getProductById } from "@/data/product";
import React from "react";

type Props = {
  params: { id: string };
};

export default async function ProductEditPage({ params }: Props) {
  const product = await getProductById(31);

  return (
    <div>
      <FormAddProduct type="EDIT" product={product || undefined} />
    </div>
  );
}
