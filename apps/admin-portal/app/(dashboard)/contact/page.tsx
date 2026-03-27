"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type ContactStatus = "new" | "read" | "replied" | "archived";

type ContactMessage = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    api<ContactMessage[]>("/contact")
      .then(setMessages)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (messageId: string, newStatus: ContactStatus) => {
    try {
      await api(`/contact/${messageId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: { "Content-Type": "application/json" },
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, status: newStatus } : msg
        )
      );

      if (selectedMessage?._id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusColor = (status: ContactStatus) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "read":
        return "bg-yellow-100 text-yellow-700";
      case "replied":
        return "bg-green-100 text-green-700";
      case "archived":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) return <div className="text-slate-600">Loading contact messages…</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Contact Submissions</h1>
        <button
          onClick={fetchMessages}
          className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-800 transition"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h2 className="font-medium text-slate-800">
                Messages ({messages.length})
              </h2>
            </div>
            <div className="divide-y divide-slate-200 max-h-[calc(100vh-250px)] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No messages yet
                </div>
              ) : (
                messages.map((msg) => (
                  <button
                    key={msg._id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition ${
                      selectedMessage?._id === msg._id ? "bg-slate-100" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium text-slate-800 text-sm">
                        {msg.firstName} {msg.lastName}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${getStatusColor(msg.status)}`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{msg.email}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                      {msg.message}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDate(msg.createdAt)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-1">
                    {selectedMessage.firstName} {selectedMessage.lastName}
                  </h2>
                  <p className="text-sm text-slate-600">{selectedMessage.email}</p>
                  {selectedMessage.phone && (
                    <p className="text-sm text-slate-600">{selectedMessage.phone}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 mb-2">
                    Received: {formatDate(selectedMessage.createdAt)}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded ${getStatusColor(selectedMessage.status)}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Message</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Update Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(["new", "read", "replied", "archived"] as ContactStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedMessage._id, status)}
                        disabled={selectedMessage.status === status}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                          selectedMessage.status === status
                            ? "bg-slate-700 text-white cursor-not-allowed opacity-70"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 flex items-center justify-center">
              <p className="text-slate-500 text-sm">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
