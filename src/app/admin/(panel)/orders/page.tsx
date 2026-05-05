import { OrdersManagementTable } from "@/components/admin/orders-management-table";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sales</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Order management</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track order lifecycle and update statuses from one place.
        </p>
      </section>
      <OrdersManagementTable />
    </div>
  );
}

