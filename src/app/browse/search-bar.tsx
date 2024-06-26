"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useSearch } from "@stream-io/video-react-sdk/dist/src/components/Search/hooks";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string().max(100),
});

export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") ?? "",
    },
  });

  const search = query.get("search");

  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) router.push(`/browse?search=${values.search}`);
    else router.push("/browse");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex gap-3"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-[440px]"
                  placeholder="Filter rooms by keywords, ex. JavaScript, Python, C#"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="mr-2" /> Search
        </Button>

        {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue("search", "");
              router.push("/");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
