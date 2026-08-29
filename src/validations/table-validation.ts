import z from "zod";

export const tableFormSchema = z.object({
  name: z.string().min(1, "Name Is Required"),
  description: z.string().min(1, "Description Is Required"),
  capacity: z.string().min(1, "Capacity Is Required"),
  status: z.string().min(1, "Status Is Required"),
});

export const tableSchema = z.object({
  name: z.string(),
  description: z.string(),
  capacity: z.number(),
  status: z.string(),
});

export type TableForm = z.infer<typeof tableFormSchema>;
export type Table = z.infer<typeof tableSchema> & { id: string };
