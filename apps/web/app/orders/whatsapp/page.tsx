"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navigation from "../../components/Navigation";
import FooterSection from "../../components/FooterSection";

const LAST_ORDER_KEY = "moonzy_last_whatsapp_order_v1";

type LastOrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type LastOrderSnapshot = {
  createdAt: string;
  items: LastOrderItem[];
  subtotal: number;
};

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function WhatsappOrderInfoPage() {
  const [snapshot, setSnapshot] = useState<LastOrderSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LAST_ORDER_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<LastOrderSnapshot>;
      if (!parsed || !Array.isArray(parsed.items)) return;

      const items: LastOrderItem[] = parsed.items
        .filter(Boolean)
        .map((i) => ({
          name: typeof i?.name === "string" ? i.name : "",
          quantity: typeof i?.quantity === "number" ? i.quantity : Number(i?.quantity),
          price: typeof i?.price === "number" ? i.price : Number(i?.price),
        }))
        .filter((i) => i.name && Number.isFinite(i.quantity) && Number.isFinite(i.price) && i.quantity > 0);

      const subtotal =
        typeof parsed.subtotal === "number"
          ? parsed.subtotal
          : items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      const createdAt = typeof parsed.createdAt === "string" ? parsed.createdAt : new Date().toISOString();

      setSnapshot({ createdAt, items, subtotal });
    } catch {
      // ignore parse/storage errors
    }
  }, []);

  const rows = useMemo(() => snapshot?.items ?? [], [snapshot]);

  return (
    <main className="min-h-screen bg-[#141826]">
      <Navigation />
      <section className="relative overflow-hidden pt-24 pb-16 md:pb-20">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse at center, #D4A94C 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-12">
          <p
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A94C]"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Moonzy
          </p>
          <h1
            className="mb-5 text-5xl font-normal text-[#F5F0E8] md:mb-6 md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            WhatsApp Opened
          </h1>
          <p
            className="mx-auto max-w-[620px] text-base leading-relaxed text-[rgba(200,195,185,0.6)] md:text-lg"
            style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif" }}
          >
            Your order details are pre-filled in WhatsApp. Review and send the
            message to confirm your order with the Moonzy team.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A94C]/40" />
            <span className="h-px w-16 bg-[rgba(200,195,185,0.15)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-10 md:pb-28 lg:px-12">
        {snapshot?.items?.length ? (
          <div className="mt-1 overflow-hidden rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 text-left shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="border-b border-[rgba(200,195,185,0.12)] px-6 py-4 sm:px-7">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D4A94C]/80">
                Order summary
              </p>
              <p className="mt-1 text-xs text-[rgba(200,195,185,0.62)]">
                Placed{" "}
                {new Date(snapshot.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(200,195,185,0.1)] text-left text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[rgba(200,195,185,0.55)]">
                    <th className="px-6 py-3 sm:px-7">Item</th>
                    <th className="px-6 py-3 text-right sm:px-7">Qty</th>
                    <th className="px-6 py-3 text-right sm:px-7">Price</th>
                    <th className="px-6 py-3 text-right sm:px-7">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => (
                    <tr key={item.name} className="border-b border-[rgba(200,195,185,0.08)] last:border-0">
                      <td className="px-6 py-3 font-semibold text-[#F5F0E8] sm:px-7">
                        {item.name}
                      </td>
                      <td className="px-6 py-3 text-right text-[rgba(200,195,185,0.72)] sm:px-7">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-3 text-right text-[rgba(200,195,185,0.72)] sm:px-7">
                        {formatMoney(item.price)}
                      </td>
                      <td className="px-6 py-3 text-right font-semibold text-[#F5F0E8] sm:px-7">
                        {formatMoney(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[rgba(200,195,185,0.12)]">
                    <td className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(200,195,185,0.62)] sm:px-7" colSpan={3}>
                      Total
                    </td>
                    <td className="px-6 py-4 text-right text-base font-bold text-[#F5F0E8] sm:px-7">
                      {formatMoney(snapshot.subtotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : null}

        <div className="mt-5 rounded-[20px] border border-[rgba(200,195,185,0.08)] bg-[#1A1F33]/65 p-6 text-left shadow-[0_8px_40px_rgba(0,0,0,0.3)] sm:p-7">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D4A94C]/80">
            What happens next
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[rgba(200,195,185,0.72)] sm:text-base">
            <li>Send the WhatsApp message that just opened.</li>
            <li>Our team reviews your order and replies with confirmation and payment details.</li>
            <li>After payment, your order is packed and shipped.</li>
          </ol>
          <p className="mt-4 text-sm font-medium text-[#F5F0E8]">
            Keep an eye on WhatsApp — your order should be confirmed soon.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center rounded-full bg-[#D4A94C] px-7 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-[#141826] shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
          >
            View my orders
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(200,195,185,0.35)] px-7 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-[#F5F0E8] transition hover:-translate-y-0.5 hover:bg-white hover:text-[#141826]"
          >
            Back to home
          </Link>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}

