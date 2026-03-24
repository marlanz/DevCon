"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = { href: string; label: string };
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/events",
    label: "Events",
  },
  {
    href: "/events/create",
    label: "Create Event",
  },
  {
    href: "/about-us",
    label: "About us",
  },
  {
    href: "/live",
    label: "Live Now",
  },
];

export function NavigationLink() {
  const pathName = usePathname();
  return (
    <ul className=" text-lg font-semibold list-none">
      {NAVIGATION_ITEMS.map((i) => {
        const isActive = pathName === i.href;
        return (
          <li key={i.label}>
            <Link
              href={i.href}
              className={cn(
                "transition-colors hover:text-blue-200",
                isActive && "text-blue-400",
              )}
            >
              {i.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
