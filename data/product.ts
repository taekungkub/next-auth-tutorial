import { db } from "@/lib/db";

export const getProductById = async (id: number) => {
  try {
    const product = await db.product.findUnique({ where: { id } });

    return product;
  } catch {
    return null;
  }
};

export const getAllProduct = async () => {
  try {
    const products = await db.product.findMany();
    return products;
  } catch {
    return null;
  }
};
