"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Checkout from "./Checkout";
import Loader from "../components/Common/Loader";
import CancelPaymentModal from "../components/Common/CancelPaymentModal";

const TicketsPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [proceedError, setProceedError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadSections = async () => {
      try {
        const res = await fetch("https://concertsapi.onlybees.in/api/sections/availability", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Unable to load tickets right now.");
        }

        const data = await res.json();
        setSections(Array.isArray(data?.sections) ? data.sections : []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, []);

  const parsedInfoLines = (info = "") => {
    const normalized = info.replace(/\\n/g, "\n");

    return normalized
      .split("\n")
      .map((line) => line.replace(/^[\s\-–—]+/, "").trim())
      .filter(Boolean);
  };

  const updateQuantity = (sectionId, delta, maxAvailable = Infinity) => {
    setQuantities((prev) => {
      const current = prev[sectionId] || 0;
      const next = Math.min(maxAvailable, Math.max(0, current + delta));
      if (next === 0) {
        const { [sectionId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [sectionId]: next };
    });
  };

  const total = sections.reduce((sum, section) => {
    const available = (section?.availableQuantity ?? 0) > 0;
    if (!available) return sum;
    return sum + (quantities[section.sectionId] || 0) * (section.price || 0);
  }, 0);

  const selectedSections = sections
    .filter((section) => (quantities[section.sectionId] || 0) > 0)
    .map((section) => ({
      id: section.sectionId,
      name: section.name,
      price: section.price,
      quantity: quantities[section.sectionId] || 0,
    }));

  const handleProceed = async () => {
    if (total === 0 || selectedSections.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("https://concertsapi.onlybees.in/api/sections/availability", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Unable to verify availability.");

      const fresh = await res.json();
      const latestSections = Array.isArray(fresh?.sections) ? fresh.sections : [];
      setSections(latestSections);

      const mismatches = selectedSections.filter((item) => {
        const match = latestSections.find((sec) => sec.sectionId === item.id);
        const available = Math.max(0, match?.availableQuantity ?? 0);
        return item.quantity > available;
      });

      if (mismatches.length > 0) {
        setProceedError("Requested tickets exceed availability. Please reduce quantities.");
        return;
      }

      setProceedError("");
      setShowCheckout(true);
    } catch (err) {
      setProceedError(err.message || "Unable to verify availability.");
    } finally {
      setLoading(false);
    }
  };

  if (showCheckout) {
    return (
      <Checkout
        items={selectedSections}
        totals={{
          subtotal: total,
          gst: Math.round(total * 0.08),
          bookingFees: total > 0 ? 100 : 0,
          grand: total + (total > 0 ? 100 : 0) + Math.round(total * 0.08),
        }}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <>
      {loading && <Loader />}

      <div className="min-h-screen bg-background text-foreground px-4 md:px-10 pt-24 pb-28">
      <button
        aria-label="Cancel payment"
        onClick={() => setShowCancelModal(true)}
        className="fixed top-6 right-6 z-40 h-10 w-10 rounded-full bg-white text-black text-xl font-semibold flex items-center justify-center shadow-md transition-transform hover:scale-105"
      >
        ×
      </button>
      <div className="max-w-4xl mx-auto flex flex-col-reverse lg:flex-row gap-10">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-accent tracking-tight mb-6">TICKETS</h1>

          {proceedError && (
            <div className="mb-4 rounded-md border border-red-500/60 bg-red-900/40 px-3 py-2 text-sm text-red-200">
              {proceedError}
            </div>
          )}

          {error && !loading && <div className="text-red-400 text-sm mb-4">{error}</div>}

          <div className="flex flex-col gap-4">
            {([...sections]
              .sort((a, b) => {
                const aSold = (a?.availableQuantity ?? 0) <= 0;
                const bSold = (b?.availableQuantity ?? 0) <= 0;
                return Number(aSold) - Number(bSold);
              })
            ).map((section) => {
              const count = quantities[section.sectionId] || 0;
              const lines = parsedInfoLines(section.info);
              const isSoldOut = (section?.availableQuantity ?? 0) <= 0;
              const maxAvailable = Math.max(0, section?.availableQuantity ?? 0);
              const canIncrement = count < maxAvailable;

              return (
                <div
                  key={section.sectionId}
                  className={`${isSoldOut ? "bg-[#0c0c0c]" : "bg-secondary"} border border-white/10 rounded-xl p-6`}
                >
                  <div className="flex items-start justify-between gap-4 border-b pb-4 border-white/10">
                    <div className="flex flex-col gap-2">
                      <p className="text-lg md:text-xl font-semibold">{section.name}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-accent text-3xl font-extrabold leading-none">₹{section.price}</span>
                        <span className="text-xs text-white/60">Excl. taxes</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {isSoldOut ? (
                        <div className="px-5 py-2 rounded-lg border border-red-600/50 bg-red-900/40 text-red-500 font-semibold text-sm">
                          SOLD OUT
                        </div>
                      ) : count === 0 ? (
                        <button
                          aria-label={`Add ${section.name}`}
                          onClick={() => updateQuantity(section.sectionId, 1, maxAvailable)}
                          className="h-11 px-4 rounded-2xl bg-[#e2e5ea] text-black text-lg font-semibold"
                          disabled={!canIncrement}
                        >
                          +
                        </button>
                      ) : (
                        <div className="flex items-center gap-4 border border-[#00ff38] rounded-2xl px-4 py-2 text-accent font-semibold text-lg bg-[#0c0c0c]">
                          <button
                            aria-label={`Remove ${section.name}`}
                            onClick={() => updateQuantity(section.sectionId, -1)}
                            className="text-accent"
                          >
                            -
                          </button>
                          <span className="min-w-4 text-center text-accent">{count}</span>
                          <button
                            aria-label={`Add ${section.name}`}
                            onClick={() => updateQuantity(section.sectionId, 1, maxAvailable)}
                            className="text-accent"
                            disabled={!canIncrement}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {lines.length > 0 && (
                    <ul className="mt-4 text-sm text-white/80 leading-relaxed space-y-1">
                      {lines.map((line, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="w-full max-w-130 rounded-2xl">
            <div className="relative w-full height-[50%]">
              <Image
                src="/Stage.png"
                alt="Venue layout"
                height={800}
                width={800}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0c0c0c] border-t border-white/10 md:px-12 py-4 flex items-center gap-4 justify-between px-8 lg:px-80 rounded-tr-4xl rounded-tl-4xl">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <span>Total:</span>
            <span className="text-2xl text-foreground font-semibold">₹{total}</span>
        </div>

        <button
          className={`px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-colors ${
            total > 0
              ? "bg-[#00D63B] text-black hover:bg-accent"
              : "bg-neutral-700 text-neutral-300 cursor-not-allowed"
          }`}
          disabled={total === 0}
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>
      </div>

      <CancelPaymentModal
        isOpen={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => router.push("/")}
      />
    </>
  );
};

export default TicketsPage;