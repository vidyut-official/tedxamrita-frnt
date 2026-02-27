"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { makePayment } from "@/lib/payment";

type Participant = {
  id: number;
  full_name: string;
  email: string;
};

export default function EventBookingPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("inhand");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const data = await apiRequest<Participant[]>(
        "/api/v1/users/participants/"
      );
      setParticipants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedUser) {
      setMessage("Please select a participant.");
      setIsError(true);
      return;
    }

    if (quantity <= 0) {
      setMessage("Quantity must be at least 1.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await makePayment({
        user_id: selectedUser,
        event_id: eventId,
        quantity,
        payment_method: paymentMethod,
      });

      setMessage("Ticket issued successfully.");
      setIsError(false);

      setTimeout(() => {
        router.push("/spot_registration/view");
      }, 1000);
    } catch (err: any) {
      setMessage(err.message || "Failed to create payment");
      setIsError(true);
    } finally {
      setLoading(false);
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
      <div className="max-w-3xl mx-auto bg-zinc-900/60 p-8 rounded-2xl border border-white/10 space-y-6">

        <h1 className="text-2xl font-bold">
          Issue Ticket
        </h1>

        {/* Participant Selection */}
        <div>
          <label className="block mb-2 font-medium">
            Select Participant
          </label>

          <select
            value={selectedUser || ""}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          >
            <option value="">-- Select Participant --</option>
            {participants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name} ({p.email})
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-2 font-medium">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-2 font-medium">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          >
            <option value="inhand">In Hand</option>
            <option value="upi">UPI</option>
            {/* <option value="card">Card</option> */}
          </select>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
        >
          Confirm & Issue Ticket
        </button>

        {message && (
          <p className={isError ? "text-red-400" : "text-green-400"}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}