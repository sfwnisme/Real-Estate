"use client"
import LoadingSpinner from "@/components/custom/loading-spinner";
import Title from "@/components/custom/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase.conf";
import { cn, firebaseErrorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(3, { error: "min 3" }).max(12, { error: "max 12" }),
  email: z.email(),
  password: z.string().min(2, "Minimum required characters is 6"),
});
type CreateUserType = z.infer<typeof CreateUserSchema>;
export default function RegisterFormView() {
  const [isRegistering, startRegister] = useTransition();

  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<CreateUserType> = (values) => {
    const {name, email, password} = values
    startRegister(async () => {
      try {
        const registerUser = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(registerUser.user, {displayName: name})
        toast.success("user create successfully")
      } catch (error: unknown) {
        const firebaseError = error as FirebaseError;
        const message = firebaseErrorMessage(firebaseError);
        form.setError("root", { type: "network", message });
      }
    });
  };

  return (
    <div>
      <Title title="Regiser new user" />
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
          <Label
            className="flex flex-col items-start gap-y-3 "
            htmlFor="name"
            aria-disabled
          >
            Name
            <Input
              type="text"
              placeholder="Safwan Mohamed"
              id="name"
              {...form.register("name")}
            />
            <small
              className={cn(
                "text-destructive inline-flex items-center visible",
                {
                  invisible: !form.formState.errors.name?.message,
                }
              )}
            >
              {form.formState.errors.name?.message}
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
            {isRegistering && <LoadingSpinner />}Register
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
