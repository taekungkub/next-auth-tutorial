import { z } from "zod";

export const CreateProductSchema = z.object({
  product_title: z.string().min(1, {
    message: "product_title is required",
  }),
  description: z.optional(z.string()),
  price: z.string().min(1, {
    message: "price is required",
  }),
  stock: z.string().min(1, {
    message: "stock is required",
  }),
  user_id: z.string().min(1, {
    message: "user_id is required",
  }),
  images: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Image is required." }),
});
