import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/api";

type Event = {
  id: number;
  name: string;
  quantity: number;
  ticket_rate: number;
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { user_id?: string };
}) {
  const userId = searchParams.user_id;

  let events: Event[] = [];

  try {
    events = await apiRequest<Event[]>("/api/v1/events/all");
  } catch (err) {
    console.error("Failed to fetch events");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Events</h1>

        {events.length === 0 ? (
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
                      <a
                        href={`events/${event.id}`}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          event.quantity === 0
                            ? "bg-gray-700 pointer-events-none text-gray-400"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        Book Ticket
                      </a>
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