import { useState } from "react";
import { Upload } from "lucide-react";
import { themeModes } from "../data";
import { useAdminData } from "../AdminDataContext";
import { AdminSurface, SectionIntro } from "../components/AdminUI";
import type { ThemeMode } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const { settings, updateSettings } = useAdminData();
  const [currency, setCurrency] = useState(settings.currency);
  const [theme, setTheme] = useState<ThemeMode>(settings.theme);
  const [fullName, setFullName] = useState(settings.fullName);
  const [email, setEmail] = useState(settings.email);
  const [password, setPassword] = useState(settings.password);

  const handleSave = () => {
    updateSettings({
      currency,
      theme,
      fullName,
      email,
      password,
    });
    window.alert("Settings saved");
  };

  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Brand Controls"
        title="Settings"
        description="Update brand assets, currency, theme, and admin profile details."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminSurface className="p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
            Website Identity
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-black">Branding and storefront</h2>

          <div className="mt-6 grid gap-5">
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6">
              <p className="text-sm font-semibold text-black">Website logo upload</p>
              <p className="mt-1 text-sm text-gray-600">
                Replace the logo used across the storefront and admin experience.
              </p>
              <Button className="mt-4 h-11 rounded-md bg-emerald-600 px-5 text-white hover:bg-emerald-700">
                <Upload className="h-4 w-4" />
                Upload Logo
              </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                  Currency selection
                </label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-11 w-full rounded-md border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["USD", "EUR", "GBP", "INR"].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                  Theme control
                </label>
                <Select
                  value={theme}
                  onValueChange={(value) => setTheme(value as ThemeMode)}
                >
                  <SelectTrigger className="h-11 w-full rounded-md border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themeModes.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </AdminSurface>

        <AdminSurface className="p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
            Admin Profile
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-black">Team preferences</h2>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                Full name
              </label>
              <Input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="h-11 rounded-md border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                Email address
              </label>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 rounded-md border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 rounded-md border-gray-300 bg-white"
              />
            </div>
            <Button
              className="h-11 w-full rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </div>
        </AdminSurface>
      </div>
    </div>
  );
}
