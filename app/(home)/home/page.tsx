import { ProductList } from "@/app/(home)/home/ProductList";
import { getAllProduct } from "@/data/product";

export default async function HomePage() {
  const data = await getAllProduct();

  return (
    <>
      <ProductList items={data || []} />
    </>
  );
}
