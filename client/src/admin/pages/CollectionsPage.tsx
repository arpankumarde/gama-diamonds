import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAdminData } from "../AdminDataContext";
import { SectionIntro, TableShell } from "../components/AdminUI";
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

export default function CollectionsPage() {
  const navigate = useNavigate();
  const { collections, deleteCollection } = useAdminData();
  const [deleteTarget, setDeleteTarget] = useState<{ _id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <SectionIntro
          eyebrow="Signature Assortments"
          title="Collections"
          description="Manage your main collections and keep product grouping organized."
          action={
            <Button
              className="h-11 rounded-md bg-emerald-600 px-5 text-white hover:bg-emerald-700"
              onClick={() => navigate("/admin/collections/new")}
            >
              <Plus className="h-4 w-4" />
              Add Collection
            </Button>
          }
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {collections.map((collection) => (
            <div
              key={collection._id}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
                Curated Collection
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-black">{collection.name}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {collection.products} products{collection.curator ? ` curated by ${collection.curator}` : ""}.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <Button
                  variant="outline"
                  className="rounded-md border-gray-300 bg-white text-black hover:bg-gray-50"
                  onClick={() => navigate(`/admin/collections/${collection._id}/edit`)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="rounded-md border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                  onClick={() => setDeleteTarget({ _id: collection._id, name: collection.name })}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <TableShell
          title="Collection List"
          description="Overview of collection ownership and assortment depth."
        >
          <div className="overflow-x-auto px-6 pb-6">
            <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-left text-xs uppercase tracking-[0.12em] text-gray-500">
                  <th className="px-5 py-4">Collection</th>
                  <th className="px-5 py-4">Products</th>
                  <th className="px-5 py-4">Curator</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => (
                  <tr
                    key={collection._id}
                    className="border-t border-gray-200 text-sm text-gray-700"
                  >
                    <td className="px-5 py-4 font-semibold text-black">{collection.name}</td>
                    <td className="px-5 py-4">{collection.products}</td>
                    <td className="px-5 py-4">{collection.curator}</td>
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
            <AlertDialogTitle>Delete collection?</AlertDialogTitle>
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
                  await deleteCollection(deleteTarget._id);
                  toast.success(`${deleteTarget.name} deleted.`);
                  setDeleteTarget(null);
                } catch (err: any) {
                  toast.error(err.message || "Failed to delete collection.");
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
