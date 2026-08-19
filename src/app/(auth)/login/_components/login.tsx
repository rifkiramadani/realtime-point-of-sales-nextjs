"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { loginSchemaForm, LoginForm } from "@/validations/auth-validation";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constants/auth-constant";
import FormInput from "@/components/common/form-input";
import { startTransition, useActionState, useEffect } from "react";
import { login } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  //instance form
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm), //panggil type dan skema form dari auth-validation.ts
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM,
  );

  //fungsi ketika tombol submit ditekan dan form berfungsi
  const onSubmit = async (data: LoginForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      loginAction(formData);
    });
  };

  useEffect(() => {
    if (loginState?.status == "error") {
      toast.error("Login Failed", {
        description: loginState.errors?._form?.[0],
      });
      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState, loginAction]);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Login to access all features</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormInput
              form={form}
              name="email"
              label="Email"
              type="email"
              placeholder="Insert Your Email"
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              type="password"
              placeholder="Insert Your Password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-3">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="login-form">
            {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
