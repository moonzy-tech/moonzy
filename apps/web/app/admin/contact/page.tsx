"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Navigation from "../../components/Navigation";
import FooterSection from "../../components/FooterSection";

type ContactStatus = "new" | "read" | "replied" | "archived";

interface ContactMessage {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContactPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/auth");
      return;
    }

    if (user.role !== "admin") {
      router.push("/");
      return;
    }

    fetchMessages();
  }, [authLoading, user, router]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (messageId: string, newStatus: ContactStatus) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/${messageId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: ContactStatus) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "read":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "replied":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "archived":
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#141826]">
        <Navigation />
        <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-28 md:px-10 lg:px-12">
          <p className="text-sm text-[rgba(200,195,185,0.75)]">
            Loading contact messages...
          </p>
        </section>
        <FooterSection />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#141826]">
      <Navigation />

      {/* Header */}
      <section className="relative overflow-hidden pt-24 pb-12 md:pb-16">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-10 lg:px-12">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C]"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Admin Panel
          </p>
          <h1
            className="mb-5 text-5xl font-normal text-[#F5F0E8] md:mb-6 md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Contact Submissions
          </h1>
          <p
            className="mx-auto max-w-[560px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] md:text-lg"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Manage and respond to customer inquiries
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10 md:pb-28 lg:px-12">
        {error && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F5F0E8]"
                  style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
                >
                  Messages ({messages.length})
                </h2>
                <button
                  onClick={fetchMessages}
                  className="rounded-lg bg-[#2B2D3A] px-3 py-1.5 text-xs text-[#F5F0E8] transition hover:bg-[#3B3D4A]"
                >
                  Refresh
                </button>
              </div>

              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="py-8 text-center text-sm text-[rgba(200,195,185,0.5)]">
                    No messages yet
                  </p>
                ) : (
                  messages.map((msg) => (
                    <button
                      key={msg._id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        selectedMessage?._id === msg._id
                          ? "border-[#D4A94C] bg-[#2B2D3A]"
                          : "border-[rgba(200,195,185,0.08)] bg-[#141826]/50 hover:border-[rgba(200,195,185,0.15)] hover:bg-[#1E2235]"
                      }`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-[#F5F0E8]">
                          {msg.firstName} {msg.lastName}
                        </p>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getStatusColor(msg.status)}`}
                        >
                          {msg.status}
                        </span>
                      </div>
                      <p className="mb-1 text-xs text-[rgba(200,195,185,0.6)]">
                        {msg.email}
                      </p>
                      <p className="line-clamp-2 text-xs text-[rgba(200,195,185,0.5)]">
                        {msg.message}
                      </p>
                      <p className="mt-2 text-[10px] text-[rgba(200,195,185,0.4)]">
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
              <div className="rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)] md:p-8">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2
                      className="mb-2 text-2xl font-normal text-[#F5F0E8] md:text-3xl"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {selectedMessage.firstName} {selectedMessage.lastName}
                    </h2>
                    <p className="text-sm text-[rgba(200,195,185,0.6)]">
                      {selectedMessage.email}
                    </p>
                    {selectedMessage.phone && (
                      <p className="text-sm text-[rgba(200,195,185,0.6)]">
                        {selectedMessage.phone}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="mb-2 text-xs text-[rgba(200,195,185,0.5)]">
                      Received: {formatDate(selectedMessage.createdAt)}
                    </p>
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusColor(selectedMessage.status)}`}
                    >
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3
                    className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(200,195,185,0.55)]"
                    style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
                  >
                    Message
                  </h3>
                  <div className="rounded-xl border border-[rgba(200,195,185,0.08)] bg-[#141826]/50 p-4">
                    <p
                      className="whitespace-pre-wrap text-sm leading-relaxed text-[#F5F0E8]"
                      style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
                    >
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div>
                  <h3
                    className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(200,195,185,0.55)]"
                    style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
                  >
                    Update Status
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(["new", "read", "replied", "archived"] as ContactStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() =>
                            updateStatus(selectedMessage._id, status)
                          }
                          disabled={selectedMessage.status === status}
                          className={`rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-wider transition ${
                            selectedMessage.status === status
                              ? "cursor-not-allowed bg-[#D4A94C] text-[#141826] opacity-70"
                              : "bg-[#2B2D3A] text-[#F5F0E8] hover:bg-[#3B3D4A]"
                          }`}
                        >
                          {status}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65">
                <p className="text-sm text-[rgba(200,195,185,0.5)]">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
