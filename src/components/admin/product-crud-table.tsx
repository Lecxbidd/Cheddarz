"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import type { MockProduct } from "@/data/mock-products";
import { CLOTHING_CATEGORIES, CATEGORY_LABELS } from "@/data/mock-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProductDraft = Pick<MockProduct, "name" | "price" | "category" | "imageUrl" | "description">;

const initialDraft: ProductDraft = {
  name: "",
  price: 0,
  category: "kids_wear",
  imageUrl: "",
  description: "",
};

export function ProductCrudTable({ products }: { products: MockProduct[] }) {
  const [rows, setRows] = useState(products.slice(0, 40));
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<ProductDraft>(initialDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => (q ? row.name.toLowerCase().includes(q) : true));
  }, [query, rows]);

  function onSave() {
    if (!draft.name.trim() || draft.price <= 0) return;
    if (!draft.imageUrl.trim()) {
      toast.error("Upload a product image (or provide an image URL) before saving.");
      return;
    }
    if (editingId) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? {
                ...row,
                ...draft,
                name: draft.name.trim(),
                description: draft.description.trim(),
              }
            : row
        )
      );
    } else {
      const id = `local-${crypto.randomUUID()}`;
      setRows((prev) => [
        {
          id,
          slug: id,
          oldPrice: Number((draft.price * 1.18).toFixed(2)),
          rating: 4.5,
          unitsSold: 0,
          officialStore: true,
          payOnDelivery: true,
          isFeatured: false,
          ...draft,
          name: draft.name.trim(),
          description: draft.description.trim(),
        },
        ...prev,
      ]);
    }
    setDraft(initialDraft);
    setEditingId(null);
  }

  function onEdit(product: MockProduct) {
    setEditingId(product.id);
    setDraft({
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      description: product.description,
    });
  }

  function onDelete(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setDraft(initialDraft);
    }
  }

  async function onImageSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data: { url?: string; error?: string } = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed");
      }
      if (data.url) {
        setDraft((prev) => ({ ...prev, imageUrl: data.url! }));
        toast.success("Image uploaded — URL filled in below.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm font-semibold">{editingId ? "Edit product" : "Create product"}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            placeholder="Product name"
            value={draft.name}
            onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
          />
          <Input
            type="number"
            min={1}
            placeholder="Price"
            value={draft.price || ""}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, price: Number(event.target.value || 0) }))
            }
          />
          <select
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={draft.category}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, category: event.target.value as MockProduct["category"] }))
            }
          >
            {CLOTHING_CATEGORIES.map((key) => (
              <option key={key} value={key}>
                {CATEGORY_LABELS[key]}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3 sm:flex-row sm:items-center">
            <Input
              className="flex-1"
              placeholder="Image URL or upload below"
              value={draft.imageUrl}
              onChange={(event) => setDraft((prev) => ({ ...prev, imageUrl: event.target.value }))}
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={onImageSelected}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 gap-1"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="size-4 shrink-0 text-foreground opacity-90" aria-hidden />
              {uploading ? "Uploading…" : "Upload"}
            </Button>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="mb-2 text-xs text-muted-foreground">Image preview</p>
            <div className="relative h-40 w-full overflow-hidden rounded-md border bg-muted/20 sm:w-56">
              {draft.imageUrl.trim() ? (
                <Image
                  src={draft.imageUrl}
                  alt="Draft product preview"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Upload an image to preview it here
                </div>
              )}
            </div>
          </div>
          <Input
            className="sm:col-span-2"
            placeholder="Description"
            value={draft.description}
            onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={onSave}>{editingId ? "Update product" : "Add product"}</Button>
          {editingId ? (
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setDraft(initialDraft);
              }}
            >
              Cancel edit
            </Button>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">Product management table</p>
          <Input
            className="max-w-xs"
            placeholder="Search products..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Category</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Featured</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-2 py-2 font-medium">{product.name}</td>
                  <td className="px-2 py-2">{product.category}</td>
                  <td className="px-2 py-2">${product.price.toFixed(2)}</td>
                  <td className="px-2 py-2">{product.isFeatured ? "Yes" : "No"}</td>
                  <td className="px-2 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(product)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

