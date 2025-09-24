import { authClient } from "@/lib/auth-client";
import { Check, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (!val) return;
      if (val.length < 8) {
        ctx.addIssue({
          code: "custom",
          message: "username must be at least 8 characters.",
        });
      }

      if (val.length > 15) {
        ctx.addIssue({
          code: "custom",
          message: "username should not be more than 15 characters.",
        });
      }

      if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: "username can only contain letters, numbers, and '_'",
        });
      }
    }),
});

interface EditUsernameFormProps {
  currentUsername?: string;
  onSkip?: () => void;
  showSkipOption?: boolean;
  suggestions?: string[];
}

export default function EditUsernameForm({
  currentUsername = "adeyemi_",
  onSkip,
  showSkipOption = true,
  suggestions = ["cosmic_dev", "pixel_master", "code_wizard"],
}: EditUsernameFormProps) {
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState<string>("");

  const { isOnline } = useNetworkStatus();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "yurex_12",
    },
  });

  const watchedUsername = form.watch("username");

  // Real-time availability checking
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

  async function onSubmit({ username }: z.infer<typeof formSchema>) {
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
    form.trigger("username"); // Trigger validation
  };

  return (
    <div className="space-y-6">
      {currentUsername && (
        <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
          <span className="text-sm text-gray-600">Current username:</span>
          <span className="rounded-md bg-white px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm">
            @{currentUsername}
          </span>
        </div>
      )}

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

                {/* Availability Message */}
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
          {/* Username Suggestions */}
          {suggestions && suggestions.length > 0 && (
            <div className="flex gap-x-1">
              <div className="text-sm font-medium text-gray-700">
                suggestions:
              </div>
              <div className="flex flex-wrap gap-x-1">
                {suggestions.map((suggestion, index) => (
                  <span
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-sm text-blue-600 hover:cursor-pointer"
                  >
                    {suggestion}
                    {index !== suggestions.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
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
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Username"
              )}
            </Button>

            {showSkipOption && (
              <Button
                type="button"
                variant="ghost"
                onClick={onSkip}
                disabled={form.formState.isSubmitting}
                className="w-full text-gray-500 hover:text-gray-700"
              >
                Skip for now
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
