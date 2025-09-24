"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components//ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { TSigninSchema, signinSchema } from "@/lib/schemas/authSchemas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ErrorContext } from "better-auth/client";

export default function SigninForm() {
  const form = useForm<TSigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const router = useRouter();

  const handleSuccess = () => {
    toast.success("Login successful.");
    router.push("/");
    form.reset();
  };

  const handleError = (ctx: ErrorContext) => {
    toast.error(ctx.error.message || "Something went wrong");
  };

  async function onsubmit({ identifier, password, rememberMe }: TSigninSchema) {
    const identifierType = identifier.includes("@") ? "email" : "username";

    if (identifierType === "email") {
      await authClient.signIn.email({
        email: identifier,
        password,
        rememberMe,
        fetchOptions: {
          onSuccess: handleSuccess,
          onError: (ctx) => handleError(ctx),
        },
      });
    }

    if (identifierType === "username") {
      await authClient.signIn.username({
        username: identifier,
        password,
        rememberMe,
        fetchOptions: {
          onSuccess: handleSuccess,
          onError: (ctx) => handleError(ctx),
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email or username</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  type="text"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  type="password"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  onBlur={field.onBlur}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormLabel htmlFor="rememberMe" className="text-gray-700">
                Remember me
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
