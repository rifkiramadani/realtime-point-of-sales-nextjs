"use client"

import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginForm } from "@/validations/auth-validation";
import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";

//panggil type dan skema form dari auth-validation.ts


export default function Login() {

    //instance form
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: INITIAL_LOGIN_FORM,
    })

    function onSubmit(data: z.infer<typeof loginSchema>) {
        console.log(data);
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">
                    Welcome
                </CardTitle>
                <CardDescription>Login to access all features</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input {...field}
                                            className={fieldState.invalid ? "ring-1 focus-visible:ring-red-500" : ''}
                                            id="email"
                                            type="email"
                                            placeholder="Insert Your Email"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )
                            }}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input {...field}
                                            className={fieldState.invalid ? "ring-1 focus-visible:ring-red-500" : ''}
                                            id="password"
                                            type="password"
                                            placeholder="Insert Your Password" />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )
                            }}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row gap-3">
                    <Button type="button" variant={'outline'} onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="login-form">
                        Submit
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}