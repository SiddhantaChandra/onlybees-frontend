import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const EventCTASection = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        className="rounded-2xl"
        src={"/mohombi_flyer.webp"}
        alt="Mohombi Flyer"
        width={900}
        height={900}
        priority
      />

      <div className="flex flex-col flex-1 w-full justify-between rounded-2xl bg-secondary gap-4 px-8 py-6 text-white lg:flex-row lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Starting
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl lg:text-4xl font-bold leading-tight">
              ₹799
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex flex-1 group items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-base font-semibold text-black transition duration-100 hover:scale-[1.05]"
        >
          Book Now
          <Play height="14" fill="#000" />
        </button>
      </div>
    </div>
  );
};

export default EventCTASection;
