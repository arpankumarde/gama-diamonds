import { NavLink } from "react-router";
import { adminNavItems } from "../data";
import { adminIcons } from "./admin-icons";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  onNavigate?: () => void;
  onLogout?: () => void | Promise<void>;
};

export default function AdminSidebar({ onNavigate, onLogout }: AdminSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col bg-white text-black">
      <div className="border-b border-gray-200 px-4 py-6">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e7d5a3] bg-[#f8f0d8] font-serif text-3xl text-[#c9a13a]">
            G
          </div>
          <div className="min-w-0 pt-1">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
              Admin Panel
            </p>
            <p className="text-lg font-light uppercase tracking-[0.18em] text-black">
              Gama Diamonds
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 bg-white px-4 py-6">
        {adminNavItems.map((item) => {
          const Icon = adminIcons[item.icon];

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium uppercase transition-colors",
                  isActive
                    ? "border-[#d7c08a] bg-[#f3e6bf] text-black"
                    : "border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-50 hover:text-black",
                )
              }
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-black transition-colors group-hover:bg-gray-50">
                <Icon className="h-4 w-4" />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        <button
          type="button"
          onClick={async () => {
            try {
              await onLogout?.();
            } finally {
              onNavigate?.();
            }
          }}
          className="group flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium uppercase transition-colors border-transparent text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition-colors group-hover:bg-red-50">
            <span className="h-4 w-4 font-bold">←</span>
          </span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
