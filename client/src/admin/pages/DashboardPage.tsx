import { useAdminData } from "../AdminDataContext";
import {
  SectionIntro,
  StatCard,
  StatusBadge,
  TableShell,
} from "../components/AdminUI";

export default function DashboardPage() {
  const { orders, dashboardStats } = useAdminData();

  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Performance Overview"
        title="Business overview"
        description="A simple summary of revenue, orders, products, and recent activity across your store."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <TableShell
        title="Recent Orders"
        description="Latest purchases and fulfillment progress across premium orders."
        actionLabel="View all"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-[0.12em] text-gray-500">
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
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
                  <td className="px-6 py-4">{order.customer}</td>
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
