import z from "zod";

export const orderFormSchema = z.object({
  customer_name: z.string().min(1, "Customer Name Is Required"),
  table_id: z.string().min(1, "Select A Table"),
  status: z.string().min(1, "Select A Status"),
});

export const orderSchema = z.object({
  customer_name: z.string(),
  table_id: z.string(),
  status: z.string(),
});

export type OrderForm = z.infer<typeof orderFormSchema>;
export type Order = z.infer<typeof orderSchema> & { id: string };
