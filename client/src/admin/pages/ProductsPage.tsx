import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAdminData } from "../AdminDataContext";
import { IconGhostButton, SectionIntro, StatusBadge, TableShell } from "../components/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function ProductsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [deleteTarget, setDeleteTarget] = useState<{ _id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { products, categories, deleteProduct } = useAdminData();

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const categoryName = typeof product.category === "object" ? product.category.name : product.category;
    const matchesCategory = categoryFilter === "All Categories" || categoryName === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <div className="space-y-6">
        <SectionIntro
          eyebrow="Catalog Control"
          title="Product inventory"
          description="Manage product images, stock, pricing, and collection placement in one simple table."
          action={
            <Button
              className="h-11 rounded-md bg-emerald-600 px-5 text-white hover:bg-emerald-700"
              onClick={() => navigate("/admin/products/new")}
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          }
        />

        <TableShell
          title="Product List"
          description="Search and refine your assortment by category or signature collection."
        >
	          <div className="space-y-5 px-6 pb-6">
	            <div className="flex flex-col gap-3 xl:flex-row">
	              <div className="relative flex-1">
	                <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
	                <Input
	                  value={query}
	                  onChange={(event) => setQuery(event.target.value)}
	                  placeholder="Search product"
	                  className="h-11 rounded-md border-gray-300 bg-white py-2 pl-11 text-sm"
	                />
	              </div>
	              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
	                <SelectTrigger className="h-11 w-full rounded-md border-gray-300 bg-white py-2 text-sm data-[size=default]:h-11 xl:w-[220px]">
	                  <SelectValue placeholder="Filter by category" />
	                </SelectTrigger>
	                <SelectContent>
	                  {["All Categories", ...categories.map((item) => item.name)].map((option) => (
	                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs uppercase tracking-[0.12em] text-gray-500">
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Stock</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const categoryName = typeof product.category === "object" ? product.category.name : product.category;
                    const mainImage = product.images?.[0] ?? "";
                    const stockStatus = product.stock <= 0 ? "Out of Stock" : product.stock <= 6 ? "Low Stock" : "In Stock";
                    const stockColor = stockStatus === "In Stock" ? "bg-emerald-500" : stockStatus === "Low Stock" ? "bg-amber-500" : "bg-rose-500";
                    return (
                      <tr key={product._id} className="border-t border-gray-200 text-sm text-gray-700">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            {mainImage ? (
                              <img
                                src={mainImage}
                                alt={product.name}
                                className="h-16 w-16 rounded-md object-cover ring-1 ring-gray-200"
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-md bg-gray-100 ring-1 ring-gray-200" />
                            )}
                            <div>
                              <p className="font-semibold text-black">{product.name}</p>
                              <p className="text-xs uppercase tracking-[0.12em] text-gray-500">{product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">{categoryName || "—"}</td>
                        <td className="px-5 py-4 font-semibold">${product.price}</td>
                        <td className="px-5 py-4">{product.stock}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <span className={`inline-block h-3 w-3 rounded-sm flex-shrink-0 ${stockColor}`} />
                            <span className="text-sm text-gray-700">{stockStatus}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-md border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
                              onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-md border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-600"
                              onClick={() => setDeleteTarget({ _id: product._id, name: product.name })}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <IconGhostButton label="More actions" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TableShell>
      </div>



      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open && !deleting) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
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
                  await deleteProduct(deleteTarget._id);
                  toast.success(`${deleteTarget.name} deleted.`);
                  setDeleteTarget(null);
                } catch (err: any) {
                  toast.error(err.message || "Failed to delete product.");
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
