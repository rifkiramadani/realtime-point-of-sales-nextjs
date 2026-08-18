import z from "zod"

//type dan skema form
export const loginSchemaForm = z.object({
    email: z.string().min(1, "Email Wajib Diisi").email("Email Tidak Valid"),
    password: z.string().min(1, "Password Wajib Diisi")
})

export type LoginForm = z.infer<typeof loginSchemaForm>;