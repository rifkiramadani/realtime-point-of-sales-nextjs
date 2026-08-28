import z from "zod";

export const menuFormSchema = z.object({
  name: z.string().min(1, "Name Is Required"),
  description: z.string().min(1, "Description Is Required"),
  price: z.string().min(1, "Price Is Required"),
  discount: z.string().min(1, "Discount Is Required"),
  category: z.string().min(1, "Category Is Required"),
  image_url: z.union([
    z.string().min(1, "Image URL Is Required"),
    z.instanceof(File),
  ]),
  is_available: z.string().min(1, "Availability Is Required"),
});

export const menuSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discount: z.number(),
  category: z.string(),
  image_url: z.union([z.string(), z.instanceof(File)]),
  is_available: z.boolean(),
});

export type MenuForm = z.infer<typeof menuFormSchema>;
export type Menu = z.infer<typeof menuSchema> & { id: string };
