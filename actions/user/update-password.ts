"use server"

import * as z from "zod"

import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import bcrypt from "bcryptjs"

import { ChangeNewPasswordSchema } from "@/schemas/auth.schema"

export const updatePassword = async (values: z.infer<typeof ChangeNewPasswordSchema>) => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  const comparePassword = await bcrypt.compareSync(values.password, String(dbUser.password))

  if (!comparePassword) {
    return { error: "Invalid Password" }
  }

  const hashedPassword = await bcrypt.hash(values.new_password, 10)

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      password: hashedPassword,
    },
  })

  return { success: "Password Updated!" }
}
