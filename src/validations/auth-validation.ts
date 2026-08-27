import z from "zod";

//type dan skema form
export const loginSchemaForm = z.object({
  email: z.string().min(1, "Email Wajib Diisi").email("Email Tidak Valid"),
  password: z.string().min(1, "Password Wajib Diisi"),
});

export const createUserSchema = z.object({
  email: z.string().min(1, "Email Wajib Diisi").email("Email Tidak Valid"),
  password: z.string().min(1, "Password Wajib Diisi"),
  name: z.string().min(1, "Nama Wajib Diisi"),
  role: z.string().min(1, "Role Wajib Diisi"),
  avatar_url: z.union([
    z.string().min(1, "Image URL Wajib Diisi"),
    z.instanceof(File),
  ]),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;
export type CreateUserForm = z.infer<typeof createUserSchema>;
