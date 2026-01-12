import EventPage from "./components/EventSection";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="event-container flex justify-center mt-24">
        <EventPage />
      </div>
      <Footer />
    </main>
  );
}
