import { useState } from "react";
import { Search } from "lucide-react";
import { useAdminData } from "../AdminDataContext";
import { SectionIntro, TableShell } from "../components/AdminUI";
import { Input } from "@/components/ui/input";

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  customer: "Customer",
};

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const { users } = useAdminData();

  const filteredUsers = users.filter((user) => {
    const value = query.toLowerCase();
    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Client Directory"
        title="Users"
        description="Search admin members and customers, review roles, and monitor account activity."
      />

      <TableShell
        title="User List"
        description="A simple view of team access and customer activity."
      >
        <div className="space-y-5 px-6 pb-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users"
              className="h-11 rounded-md border-gray-300 bg-white pl-11"
            />
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs uppercase tracking-[0.12em] text-gray-500">
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Last Login</th>
                  <th className="px-5 py-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-gray-200 text-sm text-gray-700"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-black">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === "superadmin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {ROLE_LABELS[user.role] ?? user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                        }`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                          : "Never"}
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </TableShell>
    </div>
  );
}
