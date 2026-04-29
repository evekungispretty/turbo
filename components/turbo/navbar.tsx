"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home",              href: "/",         icon: "material-symbols:nest-multi-room-outline" },
  { label: "Account Selection", href: "/accounts", icon: "material-symbols:ballot-outline" },
  { label: "Inbox",             href: "/inbox",    icon: "material-symbols:forum-outline" },
  { label: "Integrated Tools",  href: "/tools",    icon: "material-symbols:handyman-outline" },
  { label: "Alert and Action",  href: "/alerts",   icon: "material-symbols:assignment-late-outline" },
] as const;

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={cn(
        "flex flex-col h-full w-[252px] shrink-0 bg-[var(--color-surface-base)]",
        "shadow-[var(--shadow-sidebar)]",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-[8px] px-[23px] pt-[20px] pb-[68px]">
        <div className="size-[50px] rounded-full bg-[var(--color-surface-nav-active)] flex items-center justify-center shrink-0">
          <Icon icon="material-symbols:bolt" className="text-[var(--color-brand)] text-[28px]" />
        </div>
        <span
          className="font-semibold text-[18px] tracking-[0.54px] text-[var(--color-text-brand-label)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          TURBO
        </span>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-[12px] flex-1">
        {NAV_ITEMS.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-[6px] py-[8px] pr-[8px] text-[16px] text-[var(--color-text-primary)]",
              "transition-colors duration-150",
              "pl-[var(--spacing-nav-item-pl)]",
              isActive(href)
                ? "bg-[var(--color-surface-nav-active)]"
                : "hover:bg-[var(--color-surface-muted)]"
            )}
          >
            <Icon icon={icon} className="size-[24px] shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-0 h-px bg-[var(--color-border-divider)]" />

      {/* User profile */}
      <div className="mx-[24px] my-[12px] px-[8px] py-[12px] rounded-[var(--radius-card)] border border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-[10px]">
          <div className="size-[32px] rounded-full bg-[var(--color-surface-nav-active)] flex items-center justify-center shrink-0">
            <Icon icon="material-symbols:account-circle" className="text-[var(--color-text-secondary)] text-[24px]" />
          </div>
          <div className="flex flex-col gap-[2px] min-w-0">
            <span className="font-bold text-[12px] text-[var(--color-text-primary)] truncate">
              Sarah Jun
            </span>
            <span className="font-medium text-[10px] text-[var(--color-text-secondary)] truncate">
              Account Executive
            </span>
          </div>
        </div>
      </div>

      {/* Demo reset link */}
      <div className="px-[24px] pb-[16px]">
        <button className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">
          Reset demo data
        </button>
      </div>
    </nav>
  );
}
