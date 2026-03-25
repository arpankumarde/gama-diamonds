import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAdminData } from "../AdminDataContext";
import { uploadFile } from "@/lib/api";
import ProductMediaUploadRow from "../components/ProductMediaUploadRow";
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

const EMPTY_IMAGES = ["", "", ""];

const COLOR_OPTIONS = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const SHAPE_OPTIONS = ["Round", "Princess", "Solitaire", "Cushion", "Three Stone", "Halo", "Emerald", "Oval", "Radiant", "Asscher", "Marquise", "Heart", "Pear", "Elongated Cushion", "Trillion", "Baguette", "Rose Cut"];
const METAL_OPTIONS = ["9K White Gold", "9K Yellow Gold", "9K Rose Gold", "18K Rose Gold", "18K White Gold", "18K Yellow Gold", "Platinum"];
const DIAMOND_TYPE_OPTIONS = ["Lab Diamond", "Natural Diamond"];

export default function AddProductPage() {
  const navigate = useNavigate();
  const { categories, addProduct } = useAdminData();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    salePrice: "",
    stock: "",
    category: "",
    carat: "",
    color: "",
    shape: "",
    metal: "",
    diamondType: "",
    tags: "",
    video: "",
  });
  const [videoName, setVideoName] = useState("");
  const [images, setImages] = useState<string[]>(EMPTY_IMAGES);
  const [imageNames, setImageNames] = useState<string[]>(EMPTY_IMAGES);
  const [imageUploading, setImageUploading] = useState([false, false, false]);
  const [videoUploading, setVideoUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleImageChange = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      event.target.value = "";
      return;
    }

    setImageUploading((cur) => cur.map((v, i) => (i === index ? true : v)));

    try {
      const url = await uploadFile(file);
      setImages((cur) => cur.map((v, i) => (i === index ? url : v)));
      setImageNames((cur) => cur.map((v, i) => (i === index ? file.name : v)));
      toast.success(`Image ${index + 1} uploaded.`);
    } catch (err: any) {
      toast.error(err.message || "Unable to upload image.");
      event.target.value = "";
    } finally {
      setImageUploading((cur) => cur.map((v, i) => (i === index ? false : v)));
    }
  };

  const handleVideoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file.");
      event.target.value = "";
      return;
    }

    setVideoUploading(true);
    try {
      const url = await uploadFile(file);
      setField("video", url);
      setVideoName(file.name);
      toast.success("Product video uploaded.");
    } catch (err: any) {
      toast.error(err.message || "Unable to upload video.");
      event.target.value = "";
    } finally {
      setVideoUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim()) return toast.error("Product name required");
    if (!formData.price || Number(formData.price) <= 0) return toast.error("Valid price required");
    if (images.filter(Boolean).length === 0) return toast.error("At least one image required");

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        sku: formData.sku.trim().toUpperCase() || `SKU-${Date.now()}`,
        price: Number(formData.price),
        salePrice: Number(formData.salePrice) || undefined,
        category: formData.category || undefined,
        images: images.filter(Boolean),
        stock: Number(formData.stock) || 0,
        carat: Number(formData.carat) || undefined,
        color: formData.color || undefined,
        shape: formData.shape || undefined,
        metal: formData.metal || undefined,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
          : [],
        video: formData.video || undefined,
        diamondType: (formData.diamondType as "Lab Diamond" | "Natural Diamond") || undefined,
      };

      await addProduct(payload);
      toast.success("Product created and saved to database!");
      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AdminEditPageShell
        eyebrow="Catalog Control"
        title="Add Product"
        description="Create a new product entry with main image, gallery images, and product video."
        backTo="/admin/products"
        backLabel="Back to Products"
        actions={
          <>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-md border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
            >
              <Link to="/admin/products">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {submitting ? "Saving..." : "Add Product"}
            </Button>
          </>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-black">Product name *</Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Enter product name"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-sku" className="text-black">SKU</Label>
            <Input
              id="product-sku"
              value={formData.sku}
              onChange={(e) => setField("sku", e.target.value)}
              placeholder="Auto-generated if empty"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-price" className="text-black">Price *</Label>
            <Input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setField("price", e.target.value)}
              placeholder="Enter product price"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-sale-price" className="text-black">Sale Price</Label>
            <Input
              id="product-sale-price"
              type="number"
              min="0"
              step="0.01"
              value={formData.salePrice}
              onChange={(e) => setField("salePrice", e.target.value)}
              placeholder="Optional sale price"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-stock" className="text-black">Stock</Label>
            <Input
              id="product-stock"
              type="number"
              min="0"
              step="1"
              value={formData.stock}
              onChange={(e) => setField("stock", e.target.value)}
              placeholder="Enter stock quantity"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-carat" className="text-black">Carat</Label>
            <Input
              id="product-carat"
              type="number"
              min="0"
              step="0.01"
              value={formData.carat}
              onChange={(e) => setField("carat", e.target.value)}
              placeholder="e.g. 1.5"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="product-description" className="text-black">Description</Label>
            <textarea
              id="product-description"
              value={formData.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Enter product description"
              className="min-h-28 w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm text-black outline-none placeholder:text-gray-500 focus-visible:border-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-black">Category</Label>
            <Select value={formData.category} onValueChange={(v) => setField("category", v)}>
              <SelectTrigger className="h-11 rounded-md border-gray-300 bg-white text-black">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-black">Color</Label>
            <Select value={formData.color} onValueChange={(v) => setField("color", v)}>
              <SelectTrigger className="h-11 rounded-md border-gray-300 bg-white text-black">
                <SelectValue placeholder="Choose color grade" />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-black">Shape</Label>
            <Select value={formData.shape} onValueChange={(v) => setField("shape", v)}>
              <SelectTrigger className="h-11 rounded-md border-gray-300 bg-white text-black">
                <SelectValue placeholder="Choose shape" />
              </SelectTrigger>
              <SelectContent>
                {SHAPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-black">Metal</Label>
            <Select value={formData.metal} onValueChange={(v) => setField("metal", v)}>
              <SelectTrigger className="h-11 rounded-md border-gray-300 bg-white text-black">
                <SelectValue placeholder="Choose metal" />
              </SelectTrigger>
              <SelectContent>
                {METAL_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-black">Diamond Type</Label>
            <Select value={formData.diamondType} onValueChange={(v) => setField("diamondType", v)}>
              <SelectTrigger className="h-11 rounded-md border-gray-300 bg-white text-black">
                <SelectValue placeholder="Choose diamond type" />
              </SelectTrigger>
              <SelectContent>
                {DIAMOND_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-tags" className="text-black">Tags</Label>
            <Input
              id="product-tags"
              value={formData.tags}
              onChange={(e) => setField("tags", e.target.value)}
              placeholder="e.g. diamond, ring, luxury (comma separated)"
              className="h-11 rounded-md border-gray-300 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <ProductMediaUploadRow
            fieldPrefix="add-product"
            images={images}
            video={formData.video}
            imageNames={imageNames}
            videoName={videoName}
            imageUploading={imageUploading}
            videoUploading={videoUploading}
            videoPreviewImage={images[0]}
            onImageChange={handleImageChange}
            onVideoChange={handleVideoChange}
          />
        </div>
      </AdminEditPageShell>
    </form>
  );
}
