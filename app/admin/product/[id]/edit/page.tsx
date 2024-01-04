import FormAddProduct from "@/components/ProductAddForm/ProductAddForm";
import { getProductById } from "@/data/product";
import React from "react";

type Props = {
  params: { id: string };
};

export default async function ProductEditPage({ params }: Props) {
  const product = await getProductById(Number(params.id));

  return (
    <div>
      <FormAddProduct type="EDIT" product={product || undefined} />
    </div>
  );
}
