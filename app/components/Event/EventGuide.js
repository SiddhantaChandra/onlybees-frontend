import React from "react";
import { Languages, Clock3, Ticket } from "lucide-react";

const EventGuide = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Event Guide</h2>

      <div className="bg-secondary rounded-2xl px-6 py-6 flex md:flex-row flex-col flex-wrap md:flex-nowrap md:items-center md:gap-16 gap-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md">
            <Languages className="text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Language</span>
            <span className="font-semibold text-foreground">English</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md">
            <Clock3 className="text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Duration</span>
            <span className="font-semibold text-foreground">TBI</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md">
            <Ticket className=" text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Entry Allowed</span>
            <span className="font-semibold text-foreground">14 yrs &amp; above</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventGuide;