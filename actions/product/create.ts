"use server"

import { db } from "@/lib/db"
import { Product } from "@prisma/client"
import { writeFile } from "fs/promises"
import { join } from "path"

export const create = async (data: FormData) => {
  const files = data.getAll("files[]") as unknown as File[]
  const body = data.get("body")
  const product = JSON.parse(body as any) as Product

  if (!files.length) {
    return { error: "Image not found" }
  }

  try {
    let imagesPath: Array<string> = []

    await Promise.all(
      files.map(async (file: File, i) => {
        const bytes = await file.arrayBuffer()
        const buffer = await Buffer.from(bytes)
        const ext = file.name.split(".").pop()
        const newFileName = `${new Date().getTime()}${i}.${ext}`
        const publicFolderPath = join(process.cwd(), "public", "uploads", "product")
        const newPath = join(publicFolderPath, newFileName)
        imagesPath.push(newFileName)

        await writeFile(newPath, buffer)
      })
    )

    await db.product.create({
      data: {
        product_title: product.product_title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        user_id: product.user_id,
        images: imagesPath,
      },
    })

    return { success: "Create product success" }
  } catch (error) {
    return { error: "Something went wrong" }
  }
}
