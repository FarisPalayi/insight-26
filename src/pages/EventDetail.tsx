import { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { CoordinatorFooter, LogisticsGrid, EventHero, EventAccordion, PrizeModule } from '@/components/features/event-detail/';
import { StickyMobileCTA } from '@/components/features/event-detail/StickyMobileCTA';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';
import { Button } from '@/components/ui/button';

export function EventDetail() {
  const event = useLoaderData() as UnifiedEvent;
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowStickyBar(latest > 300); // Trigger earlier for better UX
  });

  return (
    <div className="min-h-screen bg-[#050505] text-foreground selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <EventHero event={event} />

        <div className="mt-12">
          <LogisticsGrid event={event} />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mt-16">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12">
            <EventAccordion event={event} />
            <CoordinatorFooter event={event} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28 h-fit">
            <PrizeModule event={event} />
            {/* Added a secondary CTA in sidebar for desktop */}
            <div className="hidden lg:block glass-surface p-6 rounded-2xl border-primary/20 bg-primary/5">
              <p className="text-sm text-muted-foreground mb-4 font-mono uppercase tracking-widest">Status: Registration Open</p>
              <Button className="w-full h-14 text-lg font-bold glow-primary">
                <Link to={`${event.registrationLink}`} >
                  Register for Event
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div >

      <StickyMobileCTA event={event} isVisible={showStickyBar} />
    </div >
  );
}
