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
    const products = await db.product.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return products;
  } catch {
    return null;
  }
};
