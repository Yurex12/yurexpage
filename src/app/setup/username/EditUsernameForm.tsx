"use client";

import { authClient } from "@/lib/auth-client";
import { Check, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
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
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { existingUser } from "@/lib/actions/authActions";
import { User } from "@/lib/auth";
import { TUsernameSchema, usernameSchema } from "@/lib/schemas/usernameSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import CurrentUsername from "../components/CurrentUsername";
import SkipButton from "../components/SkipButton";
import UsernameSuggestions from "./UsernameSuggestions";

interface EditUsernameFormProps {
  showSkipOption?: boolean;
  user: User;
}

export default function EditUsernameForm({
  user,
  showSkipOption = true,
}: EditUsernameFormProps) {
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState<string>("");

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

  // useEffect(() => {
  //   const newSuggestions = [];

  //   for (let index = 0; index < 3; index++) {
  //     const newUsername = generateUsername(user.name, user.email, 1);
  //     newSuggestions.push(newUsername);

  //     console.log(newSuggestions, 1);
  //   }
  //   setSuggestions(newSuggestions);
  // }, [user.name, user.email]);

  useEffect(() => {
    setIsAvailable(null);
    setAvailabilityMessage("");

    if (
      !watchedUsername ||
      watchedUsername.length < 8 ||
      !form.formState.isValid ||
      watchedUsername.toLowerCase() === currentUsername?.toLowerCase()
    ) {
      if (watchedUsername.toLowerCase() === currentUsername?.toLowerCase()) {
        setIsAvailable(true);
        setAvailabilityMessage("This is your current username");
      }
      return;
    }

    if (!isOnline) return;

    const timer = setTimeout(async () => {
      setIsCheckingAvailability(true);
      setIsAvailable(null);
      setAvailabilityMessage("");

      try {
        const result = await existingUser(watchedUsername);
        if (result.success) {
          setIsAvailable(true);
          setAvailabilityMessage("Great! This username is available");
        } else {
          setIsAvailable(false);
          setAvailabilityMessage("This username is already taken");
        }
      } catch (error) {
        console.error("Availability check failed:", error);
        setIsAvailable(null);
        setAvailabilityMessage(
          "Unable to check availability. Please try again.",
        );
      } finally {
        setIsCheckingAvailability(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedUsername, form.formState.isValid, currentUsername, isOnline]);

  async function onSubmit({ username }: TUsernameSchema) {
    if (username.toLowerCase() === currentUsername?.toLowerCase()) {
      toast.error("That's already your current username!");
      return;
    }

    if (isAvailable !== true) {
      toast.error("Please wait for username availability check");
      return;
    }

    try {
      await authClient.updateUser({
        username: username.toLowerCase(),
        displayUsername: username,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Username updated successfully!");
            form.reset();
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to update username");
          },
        },
      });
    } catch {
      toast.error("Failed to update username");
    }
  }

  const getStatusIcon = () => {
    if (
      !watchedUsername ||
      watchedUsername.length < 8 ||
      !form.formState.isValid
    ) {
      return null;
    }

    if (isCheckingAvailability)
      return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;

    if (isAvailable === true)
      return <Check className="h-4 w-4 text-green-500" />;

    if (isAvailable === false) return <X className="h-4 w-4 text-red-500" />;

    return null;
  };

  const getMessageColor = () => {
    if (isCheckingAvailability) return "text-blue-500";
    if (isAvailable === true) return "text-green-500";
    if (isAvailable === false) return "text-red-500";
  };

  const isCurrentUsername =
    watchedUsername?.toLowerCase() === currentUsername?.toLowerCase();

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
                    {getStatusIcon() && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {getStatusIcon()}
                      </div>
                    )}
                  </div>
                </FormControl>

                {availabilityMessage && (
                  <div className={getMessageColor()}>
                    <span className="text-sm font-normal">
                      {availabilityMessage}
                    </span>
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <UsernameSuggestions
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
          />

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={
                !form.watch("username") ||
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                !isOnline ||
                isCheckingAvailability ||
                isAvailable !== true ||
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
