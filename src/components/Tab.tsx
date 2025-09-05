"use client";

import { useCallback } from "react";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Tab = {
  containerClassName: string;
  linkClassName: string;
  activeTabClassName: string;
  tabs: string[];
};

export default function Tab({
  containerClassName,
  linkClassName,
  activeTabClassName,
  tabs,
}: Tab) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || tabs[0];

  const handleTabQuery = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className={containerClassName}>
      {tabs.map((tab) => (
        <Link
          href={`${pathname}?${handleTabQuery(tab)}`}
          key={tab}
          className={`${linkClassName} ${activeTab === tab ? activeTabClassName : ""}`}
        >
          {tab.charAt(0).toLocaleUpperCase() + tab.slice(1)}
        </Link>
      ))}
    </div>
  );
}
