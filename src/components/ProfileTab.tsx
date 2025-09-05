"use client";

import { tabs } from "@/constants";
import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import { Button } from "./ui/button";

export default function ProfileTab({ className }: ComponentProps<"div">) {
  const [activeTab, setActiveTab] = useState<"posts" | "images">("posts");

  // const searchParams = useSearchParams();

  // function handleTab(value: string) {
  //   searchParams.
  // }

  return (
    <div className={cn("sticky flex gap-x-2 px-2 py-2", className)}>
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant="ghost"
          className={`hover:text-accent-foreground h-2 rounded-full py-4 font-semibold hover:bg-blue-200 dark:hover:bg-blue-100 ${activeTab === tab ? "bg-blue-100 text-blue-700" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
