import { UserRole } from "@prisma/client"
import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
})

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
    confirm_password: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password != data.confirm_password) {
        return false
      }

      return true
    },
    {
      message: "Password not match",
      path: ["confirm_password"],
    }
  )

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  tel: z.optional(z.string().min(10).max(10)),
})

export const ChangeNewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
    new_password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
    confirm_new_password: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.new_password != data.confirm_new_password) {
        return false
      }

      return true
    },
    {
      message: "Password not match",
      path: ["confirm_new_password"],
    }
  )
