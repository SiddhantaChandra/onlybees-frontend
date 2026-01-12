import React from "react";
import EventTabs from "./EventTabs";
import { MapPin } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="flex flex-col w-full max-w-full lg:min-w-[50%]">
      <div className="text-right leading-8">
        <div className="flex items-center justify-end gap-1">
          <MapPin height={18} width="auto" className="text-accent" />
          <p>Lariti, Mawdiangdiang</p>
        </div>
        <h2 className="lg:ml-0 ml-3 lg:text-right text-left text-5xl font-bold mb-2">
          Mohombi Live in Shillong
        </h2>
        <p className="text-xl text-accent">
          Sat, Oct 25, 2025, 3:00 PM <span className="text-xs">GMT +5:30</span>
        </p>
        <p>Shillong</p>
      </div>
      <div className="w-full max-w-full">
        <EventTabs />
      </div>
    </div>
  );
};

export default EventDetails;
