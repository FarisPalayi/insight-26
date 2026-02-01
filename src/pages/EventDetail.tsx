import {
  Trophy,
  Users,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Phone,
  ChevronDown
} from 'lucide-react';
import {
  type UnifiedEvent,
  categoryLabels,
  teamSizeLabels,
  dayLabels
} from '@/lib/data/unifiedEvents'
import { useLoaderData } from 'react-router';

const EventDetailPage = () => {
  const event = useLoaderData() as UnifiedEvent;

  // Helper to handle Tiqr Redirect
  // TODO: add actual links here
  const handleRegister = () => {
    window.open(`https://tiqr.events/register/${event.id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 lg:pb-10">
      {/* 1. HERO SECTION */}
      <div className="relative h-[40vh] lg:h-[50vh] w-full overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-wider">
              {categoryLabels[event.category]}
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold mt-3">{event.name}</h1>
            <p className="text-lg lg:text-xl text-slate-200 mt-2 max-w-2xl font-medium">
              {event.tagline}
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-12 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 2. LEFT COLUMN: DETAILS */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description Section */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900">About the Event</h2>
              <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </section>

            {/* Prize Podium (If prizes exist) */}
            {event.prizes && (
              <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="text-yellow-500 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-slate-900">Prize Pool: ₹{event.prizePool}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.prizes.first && (
                    <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100 text-center">
                      <p className="text-sm font-semibold text-yellow-700 uppercase">1st Place</p>
                      <p className="text-2xl font-bold text-yellow-900">₹{event.prizes.first}</p>
                    </div>
                  )}
                  {event.prizes.second && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <p className="text-sm font-semibold text-slate-500 uppercase">2nd Place</p>
                      <p className="text-2xl font-bold text-slate-700">₹{event.prizes.second}</p>
                    </div>
                  )}
                  {event.prizes.third && (
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-center">
                      <p className="text-sm font-semibold text-orange-700 uppercase">3rd Place</p>
                      <p className="text-2xl font-bold text-orange-900">₹{event.prizes.third}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Accordion Slot (Placeholder for Rules/Guidelines) */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Rules & Guidelines</h2>
              <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                <button className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-700">Eligibility & Requirements</span>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </button>
                <div className="p-4 pt-0 text-slate-600 border-t border-slate-100">
                  <ul className="list-disc ml-5 space-y-2">
                    <li>Open to all university students with a valid ID.</li>
                    <li>Participants must bring their own laptops for tech events.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* 3. RIGHT COLUMN: LOGISTICS CARD */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl">
              <div className="space-y-6">

                {/* Info Grid */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                    <Calendar className="text-blue-600 w-5 h-5" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Date</p>
                      <p className="font-semibold text-slate-900">{dayLabels[event.schedule.day]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                    <Clock className="text-blue-600 w-5 h-5" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Time</p>
                      <p className="font-semibold text-slate-900">{event.schedule.displayTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                    <MapPin className="text-blue-600 w-5 h-5" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Venue</p>
                      <p className="font-semibold text-slate-900">{event.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                    <Users className="text-blue-600 w-5 h-5" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Team Size</p>
                      <p className="font-semibold text-slate-900">{teamSizeLabels[event.teamSize]}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Entry Fee</span>
                  <span className="text-2xl font-bold text-slate-900">₹{event.entryFee}</span>
                </div>

                <button
                  onClick={handleRegister}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-blue-200"
                >
                  Register on Tiqr
                  <ExternalLink className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-slate-400">
                  Secure checkout powered by Tiqr.events
                </p>
              </div>
            </div>

            {/* Coordinator Section */}
            {event.coordinators && (
              <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Need Help?
                </h3>
                {event.coordinators.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center mb-2 last:mb-0">
                    <span className="text-slate-400 text-sm">{c.name}</span>
                    <a href={`tel:${c.phone}`} className="text-blue-400 text-sm font-mono hover:underline">
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Fee</p>
          <p className="text-xl font-bold text-slate-900">₹{event.entryFee}</p>
        </div>
        <button
          onClick={handleRegister}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2"
        >
          Register <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EventDetailPage;
