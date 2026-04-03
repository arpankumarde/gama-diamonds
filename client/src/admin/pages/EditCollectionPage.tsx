import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useAdminData } from "../AdminDataContext";
import AdminEditPageShell from "../components/AdminEditPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditCollectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { collections, updateCollection } = useAdminData();

  const collection = useMemo(
    () => collections.find((item) => item._id === id),
    [collections, id],
  );

  const [name, setName] = useState(collection?.name ?? "");
  const [curator, setCurator] = useState(collection?.curator ?? "");

  if (!collection) {
    return <Navigate to="/admin/collections" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Collection name is required.");
      return;
    }
    try {
      await updateCollection(collection._id, { name: trimmedName, curator: curator.trim() });
      toast.success("Collection updated successfully.");
      navigate("/admin/collections");
    } catch (error: any) {
      toast.error(error.message || "Failed to update collection");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdminEditPageShell
        eyebrow="Signature Assortments"
        title={`Edit ${collection.name}`}
        description="Update collection details."
        backTo="/admin/collections"
        backLabel="Back to Collections"
        actions={
          <>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-md border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
            >
              <Link to="/admin/collections">Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Save Collection
            </Button>
          </>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="collection-name" className="text-black">Collection name</Label>
            <Input
              id="collection-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter collection name"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collection-curator" className="text-black">Curator</Label>
            <Input
              id="collection-curator"
              value={curator}
              onChange={(e) => setCurator(e.target.value)}
              placeholder="Enter curator name"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>
        </div>
      </AdminEditPageShell>
    </form>
  );
}