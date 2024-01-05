"use server";

import { db } from "@/lib/db";
import { CreateProductSchema } from "@/schemas/product.schema";
import { writeFile } from "fs/promises";
import { join } from "path";

export const create = async (data: FormData) => {
  const validatedFields = CreateProductSchema.safeParse({
    product_title: data.get("product_title"),
    description: data.get("description"),
    price: data.get("price"),
    stock: data.get("stock"),
    user_id: data.get("user_id"),
    images: data.getAll("images"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid Field" };
  }

  const { images, product_title, description, price, stock, user_id } =
    validatedFields.data;

  try {
    let imagesPath: Array<string> = [];

    await Promise.all(
      images.map(async (file: File, i: number) => {
        const bytes = await file.arrayBuffer();
        const buffer = await Buffer.from(bytes);
        const ext = file.name.split(".").pop();
        const newFileName = `${new Date().getTime()}${i}.${ext}`;
        const publicFolderPath = join(
          process.cwd(),
          "public",
          "uploads",
          "product"
        );
        const newPath = join(publicFolderPath, newFileName);
        imagesPath.push(newFileName);

        await writeFile(newPath, buffer);
      })
    );

    await db.product.create({
      data: {
        product_title: product_title,
        description: description,
        price: price,
        stock: stock,
        user_id: user_id,
        images: imagesPath,
      },
    });

    return { success: "Create product success" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
