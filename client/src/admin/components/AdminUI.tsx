import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RecentOrder, StatMetric } from "../types";

export function AdminSurface({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card
      className={cn(
        "rounded-lg border border-gray-200 bg-white py-0 shadow-none ring-0",
        className,
      )}
    >
      {children}
    </Card>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-black">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function StatCard({ stat }: { stat: StatMetric }) {
  return (
    <AdminSurface>
      <CardHeader className="px-6 pt-6">
        <CardDescription className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
          {stat.label}
        </CardDescription>
        <CardTitle className="text-3xl font-semibold text-black">
          {stat.value}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6" />
    </AdminSurface>
  );
}

export function StatusBadge({
  value,
}: {
  value: RecentOrder["status"] | RecentOrder["payment"] | string;
}) {
  const tone =
    value === "Delivered" || value === "Paid" || value === "In Stock" || value === "Featured"
      ? "bg-emerald-100 text-emerald-800"
      : value === "Processing" || value === "Low Stock"
        ? "bg-amber-100 text-amber-800"
        : value === "Pending" || value === "Standard"
          ? "bg-gray-100 text-gray-800"
          : value === "Refunded" || value === "Out of Stock"
            ? "bg-rose-100 text-rose-800"
            : "bg-blue-100 text-blue-800";

  return (
    <span className={cn("rounded-md px-3 py-1 text-xs font-semibold", tone)}>
      {value}
    </span>
  );
}

export function TableShell({
  title,
  description,
  actionLabel,
  children,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  children: ReactNode;
}) {
  return (
    <AdminSurface>
      <CardHeader className="flex flex-row items-start justify-between px-6 pt-6">
        <div>
          <CardTitle className="text-2xl font-semibold text-black">
            {title}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-600">
            {description}
          </CardDescription>
        </div>
        {actionLabel ? (
          <Button
            variant="outline"
            className="rounded-md border-gray-300 bg-white text-black hover:bg-gray-50"
          >
            {actionLabel}
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="px-0 pb-0">{children}</CardContent>
    </AdminSurface>
  );
}

export function IconGhostButton({ label }: { label: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-500"
      aria-label={label}
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );
}
