"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
    <main className="min-h-screen bg-[#FDF5E5] pt-28 pb-20 text-[#13241A]">
      <section className="mx-auto max-w-2xl px-6 lg:px-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#A45715] md:text-sm">
          Moonzy
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-[#1E3B2A] sm:text-4xl md:text-5xl">
          We&apos;ve opened WhatsApp for you.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#4C4A3F] sm:text-base">
          Your order details have been pre-filled in a WhatsApp chat.
          Please review the message and send it to confirm your order with the Moonzy team.
        </p>

        {snapshot?.items?.length ? (
          <div className="mt-6 overflow-hidden rounded-3xl bg-white/90 text-left shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
            <div className="border-b border-[#E1D4C1] px-6 py-4 sm:px-7">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7A6C54]">
                Order summary
              </p>
              <p className="mt-1 text-xs text-[#4C4A3F]">
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
                  <tr className="border-b border-[#F1E5D4] text-left text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#7A6C54]">
                    <th className="px-6 py-3 sm:px-7">Item</th>
                    <th className="px-6 py-3 text-right sm:px-7">Qty</th>
                    <th className="px-6 py-3 text-right sm:px-7">Price</th>
                    <th className="px-6 py-3 text-right sm:px-7">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => (
                    <tr key={item.name} className="border-b border-[#FDF5E5] last:border-0">
                      <td className="px-6 py-3 font-semibold text-[#1E3B2A] sm:px-7">
                        {item.name}
                      </td>
                      <td className="px-6 py-3 text-right text-[#4C4A3F] sm:px-7">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-3 text-right text-[#4C4A3F] sm:px-7">
                        {formatMoney(item.price)}
                      </td>
                      <td className="px-6 py-3 text-right font-semibold text-[#1E3B2A] sm:px-7">
                        {formatMoney(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#E1D4C1]">
                    <td className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6C54] sm:px-7" colSpan={3}>
                      Total
                    </td>
                    <td className="px-6 py-4 text-right text-base font-bold text-[#1E3B2A] sm:px-7">
                      {formatMoney(snapshot.subtotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : null}

        <div className="mt-5 rounded-3xl bg-white/90 p-6 text-left shadow-[0_22px_60px_rgba(0,0,0,0.08)] sm:p-7">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7A6C54]">
            What happens next
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[#4C4A3F] sm:text-base">
            <li>Send the WhatsApp message that just opened.</li>
            <li>Our team will review your order and reply with confirmation and payment details.</li>
            <li>Once payment is completed, your order will be packed and shipped.</li>
          </ol>
          <p className="mt-4 text-sm font-medium text-[#1E3B2A]">
            Please keep an eye on WhatsApp — your order will be confirmed soon.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center rounded-full bg-[#1E3B2A] px-7 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-white shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
          >
            View my orders
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#1E3B2A] px-7 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-[#1E3B2A] transition hover:-translate-y-0.5 hover:bg-[#1E3B2A] hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

