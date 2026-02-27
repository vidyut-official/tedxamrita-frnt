"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { verifyPayment } from "@/lib/payment";
import { jwtDecode } from "jwt-decode";

type Payment = {
  payment_id: number;
  user: string;
  user_email: string;
  event: string;
  amount: string;
  status: string;
  payment_method: string;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
};

type DecodedToken = {
  user_role: string;
  exp: number;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkRole();
    fetchPayments();
  }, []);

  const checkRole = () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.user_role === "admin") {
      setIsAdmin(true);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await apiRequest("/api/v1/payment/get/");
      setPayments(res.payments);
    } catch (err) {
      console.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (paymentId: number) => {
    setVerifyingId(paymentId);

    try {
      await verifyPayment({ payment_id: paymentId });
      await fetchPayments(); // refresh table
    } catch (err: any) {
      alert(err.message);
    } finally {
      setVerifyingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="animate-spin" size={40} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Payments</h1>

        <div className="overflow-x-auto bg-zinc-900/60 rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-zinc-800 text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.payment_id}
                  className={`border-t border-white/10 ${
                    index % 2 === 0 ? "bg-zinc-900/40" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium">{payment.user}</div>
                    <div className="text-xs text-gray-400">
                      {payment.user_email}
                    </div>
                  </td>

                  <td className="px-6 py-4">{payment.event}</td>

                  <td className="px-6 py-4">₹{payment.amount}</td>

                  <td className="px-6 py-4 capitalize">
                    {payment.payment_method}
                  </td>

                  <td className="px-6 py-4">
                    {payment.status === "verified" ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle2 size={16} />
                        Verified
                      </span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {isAdmin && payment.status === "pending" && (
                      <button
                        onClick={() =>
                          handleVerify(payment.payment_id)
                        }
                        disabled={verifyingId === payment.payment_id}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
                      >
                        {verifyingId === payment.payment_id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}