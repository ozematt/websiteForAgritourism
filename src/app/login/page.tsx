"use client";

import { signInSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";

import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { signInWithCredentials } from "@/lib/actions/auth";

const LoginPage = () => {
  // DATA

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  // LOGIC
  const handleSubmit = async (data: any) => {
    const result = await signInWithCredentials(data);

    if (result.success) {
      toast.success("Witaj w Panelu!");
      redirect("/panel");
    } else {
      toast.error("Nieprawidłowe dane logowania.");
    }
  };

  // UI
  return (
    <>
      <div className="absolute inset-0 grid place-content-center gap-7">
        <h1 className="text-2xl font-bold">Wprowadź dane logowania:</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3"
          >
            {/* user field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa uzytkownika</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="wprowadź nazwe użytkownika"
                      {...field}
                      className="placeholder:p-2"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="wprowadź hasło"
                      {...field}
                      className="placeholder:p-2"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Wyślij
            </Button>
            <p className="text-center">
              <Link href={"/"}>Wróć do strony głównej</Link>
            </p>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
