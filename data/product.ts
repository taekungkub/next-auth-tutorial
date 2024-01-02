import { db } from "@/lib/db"

export const getProductById = async (id: number) => {
  try {
    const user = await db.product.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}
