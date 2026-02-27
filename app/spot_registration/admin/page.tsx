"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/lib/payment";
import { Loader2 } from "lucide-react";

export default function AdminPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");

  const fetchPayments = async (status?: string) => {
    setLoading(true);
    try {
      const res = await getPayments(status);
      setPayments(res.payments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Payments Dashboard</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => fetchPayments()}
          className="px-4 py-2 bg-zinc-800 rounded-xl"
        >
          All
        </button>
        <button
          onClick={() => fetchPayments("pending")}
          className="px-4 py-2 bg-yellow-600 rounded-xl"
        >
          Pending
        </button>
        <button
          onClick={() => fetchPayments("completed")}
          className="px-4 py-2 bg-green-600 rounded-xl"
        >
          Completed
        </button>
      </div>

      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-white/10 text-sm">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">Verified By</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.payment_id} className="border-t border-white/5">
                  <td className="p-3">{p.user}</td>
                  <td className="p-3">{p.user_email}</td>
                  <td className="p-3">{p.event}</td>
                  <td className="p-3">₹ {p.amount}</td>
                  <td
                    className={`p-3 ${
                      p.status === "completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="p-3">{p.payment_method}</td>
                  <td className="p-3">
                    {p.verified_by || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}