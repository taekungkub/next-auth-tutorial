import { ProductList } from "@/app/(home)/home/ProductList";
import { getAllProduct } from "@/data/product";
import { Text, Title } from "@mantine/core";

export default async function HomePage() {
  const data = await getAllProduct();

  return (
    <>
    <Title order={1} ta={'center'} mt={'lg'}>Our Product</Title>
    <Text ta={'center'} c={'dimmed'} my={'lg'}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias saepe nihil tempora. Ducimus perferendis 
    </Text>
      <ProductList items={data || []} />
    </>
  );
}
