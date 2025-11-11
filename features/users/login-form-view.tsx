"use client";
import LoadingSpinner from "@/components/custom/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase.conf";
import React, { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Title from "@/components/custom/title";
import { login } from "@/lib/requests";

type Props = {};
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2, "Minimum required characters is 6"),
});
type UserLoginType = z.infer<typeof loginSchema>;

export default function LoginFormView({}: Props) {
  const [isLogin, startLogin] = useTransition();
  const form = useForm<UserLoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserLoginType> = async (values) => {
    const { email, password } = values;
    const loginResponse = await login(email, password);
    window.location.pathname = "/dashboard";
  };
  return (
    <div>
      <Title title="Login"></Title>
      <div className="pb-4" />
      <div className="w-full max-w-md border p-8 rounded mx-auto shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-5">
          <Label
            className="flex flex-col items-start gap-y-3 "
            htmlFor="email"
            aria-disabled
          >
            Email
            <Input
              type="email"
              placeholder="safwanmabdo@gmail.com"
              id="email"
              {...form.register("email")}
            />
            <small
              className={cn(
                "text-destructive inline-flex items-center visible",
                {
                  invisible: !form.formState.errors.email?.message,
                }
              )}
            >
              {form.formState.errors.email?.message}
            </small>
          </Label>
          <Label className="flex flex-col items-start gap-y-3">
            Password
            <Input
              type="password"
              placeholder="******"
              id="password"
              {...form.register("password")}
            />
            <small
              className={cn(
                "text-destructive inline-flex items-center visible",
                {
                  invisible: !form.formState.errors?.password,
                }
              )}
            >
              {form.formState.errors.password?.message}
            </small>
          </Label>
          <Button type="submit" className="w-full mt-4">
            {isLogin && <LoadingSpinner />}Login
          </Button>
          <small
            className={cn(
              "text-destructive inline-flex items-center min-h-5 visible",
              {
                invisible: !form.formState.errors.root,
              }
            )}
          >
            {form.formState.errors.root?.message}
          </small>
        </form>
      </div>
    </div>
  );
}
