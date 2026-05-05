"use client";

import { useMemo, useState } from "react";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  items: number;
  status: OrderStatus;
  createdAt: string;
};

const demoOrders: AdminOrder[] = [
  { id: "ORD-1001", customer: "Jordan Lee", email: "jordan@example.com", amount: 124, items: 3, status: "Pending", createdAt: "2026-04-27" },
  { id: "ORD-1002", customer: "Amara Cole", email: "amara@example.com", amount: 89, items: 2, status: "Processing", createdAt: "2026-04-28" },
  { id: "ORD-1003", customer: "Tobi D.", email: "tobi@example.com", amount: 214, items: 5, status: "Shipped", createdAt: "2026-04-28" },
  { id: "ORD-1004", customer: "Priya K.", email: "priya@example.com", amount: 62, items: 1, status: "Delivered", createdAt: "2026-04-29" },
  { id: "ORD-1005", customer: "Alex R.", email: "alex@example.com", amount: 148, items: 4, status: "Pending", createdAt: "2026-04-29" },
];

function isInQueue(status: OrderStatus) {
  return status === "Pending" || status === "Processing";
}

export function OrdersManagementTable() {
  const [rows, setRows] = useState(demoOrders);
  const [query, setQuery] = useState("");
  const [listFilter, setListFilter] = useState<"all" | "queue">("all");

  const queueCount = useMemo(() => rows.filter((r) => isInQueue(r.status)).length, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch = q
        ? `${row.id} ${row.customer} ${row.email}`.toLowerCase().includes(q)
        : true;
      const matchesTab = listFilter === "queue" ? isInQueue(row.status) : true;
      return matchesSearch && matchesTab;
    });
  }, [query, rows, listFilter]);

  function updateStatus(id: string, status: OrderStatus) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2 text-sm">
        <span className="font-semibold text-amber-950 dark:text-amber-100">
          Orders in queue (pending &amp; processing):
        </span>
        <span className="rounded-full bg-amber-600 px-2.5 py-0.5 text-xs font-bold text-white">
          {queueCount}
        </span>
      </div>

      <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              listFilter === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted"
            }`}
            onClick={() => setListFilter("all")}
          >
            All orders
          </button>
          <button
            type="button"
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
              listFilter === "queue"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted"
            }`}
            onClick={() => setListFilter("queue")}
          >
            Queue only
          </button>
        </div>
        <input
          className="h-9 max-w-xs rounded-md border bg-background px-3 text-sm"
          placeholder="Search orders..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="px-2 py-2">Order</th>
              <th className="px-2 py-2">Customer</th>
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Items</th>
              <th className="px-2 py-2">Amount</th>
              <th className="px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-2 py-2 font-medium">{order.id}</td>
                <td className="px-2 py-2">
                  <p>{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </td>
                <td className="px-2 py-2">{order.createdAt}</td>
                <td className="px-2 py-2">{order.items}</td>
                <td className="px-2 py-2">${order.amount.toFixed(2)}</td>
                <td className="px-2 py-2">
                  <select
                    className="h-8 rounded-md border bg-background px-2 text-xs"
                    value={order.status}
                    onChange={(event) => updateStatus(order.id, event.target.value as OrderStatus)}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

