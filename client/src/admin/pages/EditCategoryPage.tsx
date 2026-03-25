import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useAdminData } from "../AdminDataContext";
import AdminEditPageShell from "../components/AdminEditPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, updateCategory } = useAdminData();

  const categoryItem = useMemo(
    () => categories.find((item) => item._id === id),
    [categories, id],
  );

  const [name, setName] = useState(categoryItem?.name ?? "");
  const [featured, setFeatured] = useState(
    categoryItem?.featured ? "featured" : "standard",
  );

  if (!categoryItem) {
    return <Navigate to="/admin/category" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Category name is required.");
      return;
    }

    try {
      await updateCategory(categoryItem._id, {
        name: trimmedName,
        featured: featured === "featured",
      });
      toast.success("Category updated successfully.");
      navigate("/admin/category");
    } catch (error: any) {
      toast.error(error.message || "Failed to update category");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdminEditPageShell
        eyebrow="Store Structure"
        title={`Edit ${categoryItem.name}`}
        description="Rename the category or update whether it should be highlighted as a featured browse path."
        backTo="/admin/category"
        backLabel="Back to Categories"
        actions={
          <>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-md border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
            >
              <Link to="/admin/category">Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Save Category
            </Button>
          </>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category-name" className="text-black">Category name</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter category name"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-black">Category visibility</Label>
            <Select value={featured} onValueChange={setFeatured}>
              <SelectTrigger className="h-11 rounded-md border-gray-300 bg-white text-black">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </AdminEditPageShell>
    </form>
  );
}
