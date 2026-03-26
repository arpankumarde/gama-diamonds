import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAdminData } from "../AdminDataContext";
import AdminEditPageShell from "../components/AdminEditPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddCollectionPage() {
  const navigate = useNavigate();
  const { addCollection } = useAdminData();
  const [name, setName] = useState("");
  const [curator, setCurator] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Collection name is required.");
      return;
    }

    try {
      await addCollection({ name: trimmedName, curator: curator.trim() });
      toast.success("Collection created successfully.");
      navigate("/admin/collections");
    } catch (error: any) {
      toast.error(error.message || "Failed to create collection");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdminEditPageShell
        eyebrow="Signature Assortments"
        title="Add Collection"
        description="Create a new collection page in the same refined admin theme used for editing."
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
              Add Collection
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
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter collection name"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collection-curator" className="text-black">Curator</Label>
            <Input
              id="collection-curator"
              value={curator}
              onChange={(event) => setCurator(event.target.value)}
              placeholder="Enter curator name"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>
        </div>
      </AdminEditPageShell>
    </form>
  );
}
