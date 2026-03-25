import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { AdminSurface } from "./AdminUI";

type AdminEditPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  backTo: string;
  backLabel: string;
  children: ReactNode;
  actions: ReactNode;
};

export default function AdminEditPageShell({
  eyebrow,
  title,
  description,
  backTo,
  backLabel,
  children,
  actions,
}: AdminEditPageShellProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button
          asChild
          variant="outline"
          className="rounded-md border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
        >
          <Link to={backTo}>
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </Button>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-black">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <AdminSurface className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
          <p className="text-sm font-semibold text-black">Update details</p>
          <p className="mt-1 text-sm text-gray-600">
            Save your changes to refresh the admin panel instantly.
          </p>
        </div>

        <div className="space-y-6 px-6 py-6">
          {children}

          <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            {actions}
          </div>
        </div>
      </AdminSurface>
    </div>
  );
}
