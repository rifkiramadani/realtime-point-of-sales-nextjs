"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthFormState } from "@/types/auth";
import { loginSchemaForm } from "@/validations/auth-validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constant";

export async function login(
  prevState: AuthFormState,
  formData: FormData | null,
) {
  if (!formData) {
    return INITIAL_STATE_LOGIN_FORM;
  }
  //validasi data inputan dari user
  const validatedFields = loginSchemaForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //jikalau gagal validasi
  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  //jikalau lolos validasi
  const supabase = await createClient();

  //log in menggunakan data dari inputan yang sudah di validasi
  const { error, data } = await supabase.auth.signInWithPassword(
    validatedFields.data,
  );

  //jikalau gagal/error mengambil data
  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  //ambil data user
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user?.id)
    .single();

  //letakkan data user tersebut ke dalam cookies
  if (profile) {
    const cookiesStore = await cookies();
    cookiesStore.set("user_profile", JSON.stringify(profile), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  revalidatePath("/", "layout"); //buang cache sebelumnya
  redirect("/"); //next/navigation
}
