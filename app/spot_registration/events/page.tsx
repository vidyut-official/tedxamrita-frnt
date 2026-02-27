"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";

type Event = {
  id: number;
  name: string;
  quantity: number;
  ticket_rate: number;
};

export default function EventsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await apiRequest<Event[]>("/api/v1/events/all");
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleBookTicket = (eventId: number) => {
    router.push(`events/${eventId}`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Events</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No events available.
          </div>
        ) : (
          <div className="overflow-x-auto bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-zinc-800/70 text-gray-300 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Event Name</th>
                  <th className="px-6 py-4">Available Seats</th>
                  <th className="px-6 py-4">Ticket Rate</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className={`border-t border-white/10 ${
                      index % 2 === 0 ? "bg-zinc-900/40" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">
                      {event.name}
                    </td>

                    <td className="px-6 py-4">
                      {event.quantity > 0 ? (
                        <span className="text-green-400">
                          {event.quantity}
                        </span>
                      ) : (
                        <span className="text-red-400">
                          Sold Out
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      ₹{event.ticket_rate}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleBookTicket(event.id)}
                        disabled={event.quantity === 0}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          event.quantity === 0
                            ? "bg-gray-700 cursor-not-allowed text-gray-400"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        Book Ticket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}