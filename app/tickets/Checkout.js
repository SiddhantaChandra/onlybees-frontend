"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const currency = (n) => `₹${n || 0}`;

const Checkout = ({ items = [], totals = { subtotal: 0, gst: 0, bookingFees: 0, grand: 0 }, onBack }) => {
  const hasItems = (items || []).length > 0;

  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    setTimeLeft(600);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const subtotal = totals?.subtotal ?? items.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  );
  const gst = totals?.gst ?? Math.round(subtotal * 0.08);
  const bookingFees = totals?.bookingFees ?? (subtotal > 0 ? 100 : 0);
  const grand = totals?.grand ?? subtotal + gst + bookingFees;
  const displayTotals = { subtotal, gst, bookingFees, grand };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 md:px-10 pt-24 pb-32">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-accent tracking-tight">CHECKOUT</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-accent">Time left: {formatTime(timeLeft)}</span>
              <button
                aria-label="Close checkout"
                onClick={onBack}
                className="h-9 w-9 rounded-full border border-white/20 text-white hover:bg-white/10"
              >
                ×
              </button>
            </div>
          </div>

          {!hasItems && (
            <div className="text-white/70 text-sm mb-6">No tickets selected. Go back and add tickets.</div>
          )}

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-white/80">Name :</label>
              <input
                type="text"
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80">Email :</label>
              <input
                type="email"
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
              />
              <p className="text-xs text-white/50">You'll receive a copy of the tickets here</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/80">Phone :</label>
              <div className="flex items-center gap-3 bg-[#0c0c0c] border border-white/10 rounded-md px-3 py-3">
                <span className="text-white/80">+91</span>
                <input
                  type="tel"
                  className="flex-1 bg-transparent outline-none"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <p className="text-xs text-white/60">
              By purchasing you'll receive an account, and agree to our Terms of use, Privacy Policy, and Ticket Purchase Terms.
            </p>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-xl p-4 flex gap-4">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-white/5">
              <Image src="/mohombi_flyer.webp" alt="Event" height={280} width={280} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Mohombi Live in Shillong</h3>
              <p className="text-sm text-white/70">Lariti, Mawdiangdiang</p>
              <p className="text-sm text-accent">Sat, Oct 25, 2025</p>
              <p className="text-sm text-white/70">Shillong</p>
            </div>
          </div>

          <div className="mt-6 bg-[#0c0c0c] border border-white/10 rounded-xl p-4 space-y-3">
            <h4 className="text-lg font-semibold text-accent">Order Summary</h4>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span>
                    {item.name} <span className="text-white/50">x{item.quantity}</span>
                  </span>
                  <span>{currency((item.price || 0) * (item.quantity || 0))}</span>
                </div>
              ))}
              {items.length === 0 && <div className="text-white/60 text-sm">No items</div>}
            </div>
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>GST (est.)</span>
              <span>{currency(displayTotals.gst)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>Booking Fees</span>
              <span>{currency(displayTotals.bookingFees)}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{currency(displayTotals.grand)}</span>
            </div>
            <div className="pt-3 space-y-2">
              <label className="text-sm text-white/80">Have a Coupon Code?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 bg-[#0c0c0c] border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter code here"
                />
                <button className="px-4 py-2 rounded-md bg-white text-black font-semibold">APPLY</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0c0c0c] border-t border-white/10 md:px-12 py-4 flex items-center gap-4 justify-between px-8 lg:px-80 rounded-tr-4xl rounded-tl-4xl">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <span>Total:</span>
          <span className="text-2xl text-foreground font-semibold">{currency(displayTotals.grand)}</span>
        </div>
        <button
          className={`px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-colors ${
            hasItems ? "bg-[#00D63B] text-black hover:bg-accent" : "bg-neutral-700 text-neutral-300 cursor-not-allowed"
          }`}
          disabled={!hasItems}
          onClick={() => {
            if (!hasItems) return;
            console.log("Checkout total:", displayTotals.grand, "Items:", items);
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
