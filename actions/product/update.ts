"use server";

import { getProductById } from "@/data/product";
import { db } from "@/lib/db";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";

export const update = async (data: FormData, id: number) => {
  try {
    if (!db.product) {
      return { error: "Unauthorized" };
    }

    const existingProduct = await getProductById(id);

    if (!existingProduct) {
      return { error: "Product not found" };
    }

    const data2 = {
      product_title: data.get("product_title"),
      description: data.get("description"),
      price: data.get("price"),
      stock: data.get("stock"),
      userId: data.get("userId"),
      images: data.getAll("images"),
    };

    const { images, product_title, description, price, stock, userId } = data2;

    let imagesPath: Array<string> = [];

    if (data2.images) {
      await Promise.all(
        images.map(async (file: any, i: number) => {
          const bytes = await file.arrayBuffer();
          const buffer = await Buffer.from(bytes);
          const ext = file.name.split(".").pop();
          const newFileName = `${new Date().getTime()}${i}.${ext}`;
          const publicFolderPath = join(process.cwd(), "public", "uploads", "product");
          const newPath = join(publicFolderPath, newFileName);
          imagesPath.push(newFileName);
          await writeFile(newPath, buffer);
        })
      );

      existingProduct.images.map((filename) => {
        unlink(join(process.cwd(), "public", "uploads", "product", filename));
      });
    }

    await db.product.update({
      where: { id: id },
      data: {
        product_title: String(product_title),
        description: String(description),
        price: String(price),
        stock: String(stock),
        user_id: String(userId),
        images: imagesPath,
      },
    });

    return { success: "Update product success" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
