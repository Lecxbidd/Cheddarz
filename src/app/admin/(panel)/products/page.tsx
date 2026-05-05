import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductCrudTable } from "@/components/admin/product-crud-table";

export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Catalogue</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Product CRUD</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create, update, and remove products from the table. Signed-in admins can upload images (saved
          under <code className="rounded bg-muted px-1 py-0.5 text-xs">/assets/uploads</code> on this
          server).
        </p>
      </section>
      <ProductCrudTable products={MOCK_PRODUCTS} />
    </div>
  );
}

