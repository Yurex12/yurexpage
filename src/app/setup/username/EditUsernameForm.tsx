"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import MiniSpinner from "@/components/MiniSpinner";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CurrentUsername from "../components/CurrentUsername";
import SkipButton from "../components/SkipButton";
import UsernameSuggestions from "./UsernameSuggestions";

import { TUsernameSchema, usernameSchema } from "@/lib/schemas/usernameSchema";

import { authClient } from "@/lib/auth-client";
import { generateSuggestions } from "@/lib/username";

import useNetworkStatus from "@/hooks/useNetworkStatus";

import { MIN_USERNAME_LENGTH } from "@/constants";

import { EditUsernameFormProps } from "@/types/types";

export const USERNAME_AVAILABILITY_DEBOUNCE = 500;

export default function EditUsernameForm({
  user,
  showSkipOption = true,
}: EditUsernameFormProps) {
  const [availability, setAvailability] = useState<{
    status: "idle" | "checking" | "available" | "taken" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { isOnline } = useNetworkStatus();

  const form = useForm<TUsernameSchema>({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
    },
  });
  const router = useRouter();

  const watchedUsername = form.watch("username");
  const currentUsername = user.username!;

  useEffect(() => {
    const suggestions = generateSuggestions(user.name);
    setSuggestions(suggestions);
  }, [user.name]);

  useEffect(() => {
    if (
      !watchedUsername ||
      watchedUsername.length < MIN_USERNAME_LENGTH ||
      !form.formState.isValid ||
      watchedUsername.toLowerCase() === currentUsername?.toLowerCase()
    ) {
      if (watchedUsername.toLowerCase() === currentUsername?.toLowerCase()) {
        setAvailability({
          status: "available",
          message: "This is your current username",
        });
      } else {
        setAvailability({ status: "idle", message: "" });
      }
      return;
    }

    if (!isOnline) {
      setAvailability({
        status: "error",
        message: "No internet connection.",
      });
      return;
    }

    const timer = setTimeout(async () => {
      setAvailability({ status: "checking", message: "" });

      try {
        const { data, error } = await authClient.isUsernameAvailable({
          username: watchedUsername,
        });

        if (error) {
          setAvailability({
            status: "error",
            message: "Unable to check availability. Please try again.",
          });
          return;
        }

        if (data?.available) {
          setAvailability({
            status: "available",
            message: "Great! This username is available",
          });
        } else {
          setAvailability({
            status: "taken",
            message: "This username is already taken",
          });
        }
      } catch {
        setAvailability({
          status: "error",
          message: "Unable to check availability. Please try again.",
        });
      }
    }, USERNAME_AVAILABILITY_DEBOUNCE);

    return () => clearTimeout(timer);
  }, [watchedUsername, form.formState.isValid, currentUsername, isOnline]);

  async function onSubmit({ username }: TUsernameSchema) {
    if (username.toLowerCase() === currentUsername?.toLowerCase()) {
      toast.error("That's already your current username!");
      return;
    }

    if (availability.status !== "available") {
      toast.error("Please wait for username availability check");
      return;
    }

    const { error } = await authClient.updateUser({
      username: username.toLowerCase(),
      displayUsername: username,
    });

    if (error) {
      toast.error(error.message || "Failed to update username");
      return;
    }

    toast.success("Username updated successfully!");
    form.reset();
    router.refresh();
    router.push("/");
  }

  const getStatusIcon = () => {
    if (
      !watchedUsername ||
      watchedUsername.length < MIN_USERNAME_LENGTH ||
      !form.formState.isValid
    ) {
      return null;
    }

    if (availability.status === "checking") {
      return <Loader2 className="size-4 animate-spin text-blue-500" />;
    }
    if (availability.status === "available") {
      return <Check className="size-4 text-green-500" />;
    }
    if (availability.status === "taken") {
      return <X className="size-4 text-red-500" />;
    }
    if (availability.status === "error") {
      return <X className="size-4 text-red-500" />;
    }

    return null;
  };

  const getMessageColor = () => {
    switch (availability.status) {
      case "checking":
        return "text-blue-500";
      case "available":
        return "text-green-500";
      case "taken":
      case "error":
        return "text-red-500";
      default:
        return "text-gray-700";
    }
  };

  const isCurrentUsername =
    watchedUsername?.toLowerCase() === currentUsername?.toLowerCase();

  const statusIcon = getStatusIcon();

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("username", suggestion);
    form.trigger("username");
  };

  return (
    <CardContent className="space-y-6">
      <CurrentUsername username={currentUsername} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label>New Username</Label>
                <FormControl>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-sm text-gray-500">@</span>
                    </div>
                    <Input
                      placeholder="your_username"
                      {...field}
                      className="pr-10 pl-8"
                    />
                    {statusIcon && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {statusIcon}
                      </div>
                    )}
                  </div>
                </FormControl>

                {availability.message && (
                  <div className={getMessageColor()}>
                    <span className="text-sm font-normal">
                      {availability.message}
                    </span>
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {suggestions.length ? (
            <UsernameSuggestions
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          ) : null}

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={
                !form.watch("username") ||
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                !isOnline ||
                availability.status !== "available" ||
                isCurrentUsername
              }
              className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:from-blue-600 hover:via-blue-700 hover:to-indigo-800 hover:shadow-2xl disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-500 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              {form.formState.isSubmitting ? (
                <MiniSpinner text="Updating..." />
              ) : (
                "Update Username"
              )}
            </Button>

            {showSkipOption && (
              <SkipButton disabled={form.formState.isSubmitting} />
            )}
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
