import React from "react";
import BackButton from "./BackButton";
import { cn } from "@/lib/utils";

type TPageHeader = {
  title: string;
  containerClassName?: string;
  titleClassName?: string;
  iconClassName?: string;
};

export default function PageHeader({
  title,
  containerClassName,
  titleClassName,
  iconClassName,
}: TPageHeader) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-x-2 bg-gray-200 px-2 py-1",
        containerClassName,
      )}
    >
      <BackButton iconClassName={iconClassName} />
      <span
        className={cn("text-base font-semibold text-gray-900", titleClassName)}
      >
        {title}
      </span>
    </div>
  );
}
