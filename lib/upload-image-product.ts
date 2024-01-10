import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";

export const uploadImageProduct = async (files: any, doc: Product) => {
  try {
    if (!files) return;
    let imagesPath: Array<string> = [];

    await Promise.all(
      files.map(async (file: File, i: number) => {
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

    let result = db.product.update({
      where: { id: doc.id },
      data: { images: imagesPath },
    });

    return result;
  } catch (error) {}
};

export const removeImageProduct = async (images: any) => {
  images.map((filename: string) => {
    unlink(join(process.cwd(), "public", "uploads", "product", filename));
  });
};
