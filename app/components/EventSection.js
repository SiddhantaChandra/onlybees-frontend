import React from "react";
import EventDetails from "./Event/EventDetails";
import EventCTASection from "./Event/EventCTASection";
import EventGuide from "./Event/EventGuide";
import EventArtist from "./Event/EventArtist";

const EventPage = () => {
  return (
    <div>
      <div className="lg:max-h-[90vh] mt-28 gap-6 flex flex-col lg:flex-row-reverse mb-8">
        <EventCTASection />
        <EventDetails />
      </div>
      <EventGuide />
      <EventArtist />
    </div>
  );
};

export default EventPage;
