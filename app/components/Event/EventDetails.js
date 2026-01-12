import React from "react";
import EventTabs from "./EventTabs";
import { MapPin } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="flex flex-col max-w-full lg:min-w-[50%] lg:max-w-[55%]">
      <div className="lg:text-right lg:p-0 mg:ml-0 ml-3 leading-8">
        <div className="flex items-center lg:justify-end gap-1">
          <MapPin height={18}  className="text-accent" />
          <p>Lariti, Mawdiangdiang</p>
        </div>
        <h2 className="lg:ml-0 lg:text-right text-left text-5xl font-bold mb-2">
          Mohombi Live in Shillong
        </h2>
        <p className="text-xl text-accent">
          Sat, Oct 25, 2025, 3:00 PM <span className="text-xs block mt-2 sm:inline sm:mt-0">GMT +5:30</span>
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
