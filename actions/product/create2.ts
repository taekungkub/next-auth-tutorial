"use server";

import { getProductById } from "@/data/product";
import { db } from "@/lib/db";
import {
  removeImageProduct,
  uploadImageProduct,
} from "@/lib/upload-image-product";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const create2 = async (formData: FormData) => {
  try {
    const images = formData.getAll("images");
    const bodyRaw = formData.get("body");

    if (!bodyRaw) return { error: "body is required" };

    const body: Product = bodyRaw ? JSON.parse(bodyRaw?.toString()) : null;

    if (!body) return { error: "body is required" };

    const result = await db.product.create({
      data: {
        product_title: body.product_title,
        description: body.description,
        price: body.price,
        stock: body.stock,
        user_id: body.user_id,
      },
    });

    if (images) {
      uploadImageProduct(images, result);
    }

    revalidatePath("/admin/product");

    return { success: "Create product success" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const update2 = async (id: number, formData: FormData) => {
  try {
    const images = formData.getAll("images");
    const bodyRaw = formData.get("body");

    if (!bodyRaw) return { error: "body is required" };

    const body: Product = bodyRaw ? JSON.parse(bodyRaw?.toString()) : null;

    if (!body) return { error: "body is required" };

    const existingProduct = await getProductById(id);

    if (!existingProduct) {
      return { error: "Product not found" };
    }

    const result = await db.product.update({
      where: { id: id },
      data: {
        product_title: body.product_title,
        description: body.description,
        price: body.price,
        stock: body.stock,
        user_id: body.user_id,
      },
    });

    if (images) {
      uploadImageProduct(images, result);
      // remove old image
      removeImageProduct(existingProduct.images);
    }

    revalidatePath("/admin/product");

    return { success: "Update product success" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
