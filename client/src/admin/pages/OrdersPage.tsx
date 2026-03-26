import { useAdminData } from "../AdminDataContext";
import { SectionIntro, StatusBadge, TableShell } from "../components/AdminUI";

export default function OrdersPage() {
  const { orders } = useAdminData();

  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Fulfillment Studio"
        title="Orders"
        description="Review order status, customer details, payments, and dates from one simple screen."
      />

      <TableShell
        title="Orders Table"
        description="Track pending, processing, and delivered orders with payment visibility."
        actionLabel="Export orders"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-[0.12em] text-gray-500">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 text-sm text-gray-700"
                >
                  <td className="px-6 py-4 font-semibold text-black">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-black">{order.customer}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-gray-500">
                        Premium Client
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-semibold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <StatusBadge value={order.payment} />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge value={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableShell>
    </div>
  );
}
