"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideSearch, Mic } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  search: z
    .string()
    .min(2, { message: "Search must be at least 2 characters." }),
});

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

export default function SearchInput({
  defaultValue,
  placeholder,
  onSubmit,
}: Readonly<SearchInputProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchParams.get("s") ?? "",
    },
  });

  useEffect(() => {
    const searchQuery = searchParams.get("s") ?? "";
    form.setValue("search", searchQuery);
  }, [searchParams, form]);

  const handleDefaultSubmit = (values: z.infer<typeof formSchema>) => {
    router.push(`/search?s=${encodeURIComponent(values.search)}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || handleDefaultSubmit)}
        className="mx-auto w-full max-w-4xl space-y-2 px-4 sm:px-0"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormControl>
                <div className="relative w-full">
                  {/* Single-line input */}
                  <input
                    {...field}
                    type="text"
                    placeholder={placeholder || "Search for businesses..."}
                    className="text-md w-full rounded-full border border-gray-300 p-5 pr-28 text-left shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />

                  {/* Buttons container at bottom-right */}
                  <div className="absolute right-3 bottom-3/13 flex space-x-3">
                    {/* Voice recognition button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="p-3 sm:p-4"
                    >
                      <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>

                    {/* Search submit button */}
                    <Button
                      type="submit"
                      size="icon"
                      className="rounded-full p-3 sm:p-4"
                    >
                      <LucideSearch className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </div>
                </div>
              </FormControl>

              {/* Small description below input */}
              <FormDescription className="mt-1 text-center text-xs text-gray-500 sm:text-sm">
                Give a descriptive search for the business e.g. "Best coffee
                resturants in Toronto"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
