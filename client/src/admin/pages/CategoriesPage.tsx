import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAdminData } from "../AdminDataContext";
import { SectionIntro, StatusBadge, TableShell } from "../components/AdminUI";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { categories, deleteCategory } = useAdminData();
  const [deleteTarget, setDeleteTarget] = useState<{ _id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <SectionIntro
          eyebrow="Store Structure"
          title="Categories"
          description="Maintain the product taxonomy shoppers use to browse the catalogue with ease."
          action={
            <Button
              className="h-11 rounded-md bg-emerald-600 px-5 text-white hover:bg-emerald-700"
              onClick={() => navigate("/admin/category/new")}
            >
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          }
        />

        <TableShell
          title="Category List"
          description="Update names, featured states, and item volume across major groups."
        >
          <div className="overflow-x-auto px-6 pb-6">
            <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-left text-xs uppercase tracking-[0.12em] text-gray-500">
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Products</th>
                  <th className="px-5 py-4">Featured</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-t border-gray-200 text-sm text-gray-700"
                  >
                    <td className="px-5 py-4 font-semibold text-black">{category.name}</td>
                    <td className="px-5 py-4">{category.products}</td>
                    <td className="px-5 py-4">
                      <StatusBadge value={category.featured ? "Featured" : "Standard"} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-md border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
                          onClick={() => navigate(`/admin/category/${category._id}/edit`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-md border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-600"
                          onClick={() => setDeleteTarget({ _id: category._id, name: category.name })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableShell>
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open && !deleting) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-black">{deleteTarget?.name}</span>{" "}
              from the database. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              className="bg-rose-600 hover:bg-rose-700"
              onClick={async (e) => {
                e.preventDefault();
                if (!deleteTarget) return;
                setDeleting(true);
                try {
                  await deleteCategory(deleteTarget._id);
                  toast.success(`${deleteTarget.name} deleted.`);
                  setDeleteTarget(null);
                } catch (err: any) {
                  toast.error(err.message || "Failed to delete category.");
                } finally {
                  setDeleting(false);
                }
              }}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
