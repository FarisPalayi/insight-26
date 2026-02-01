import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { CoordinatorFooter, LogisticsGrid, EventHero, EventAccordion, PrizeModule } from '@/components/features/event-detail/';
import { StickyMobileCTA } from '@/components/features/event-detail/StickyMobileCTA';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';
import Main from '@/components/layout/Main';

export function EventDetail() {
  const event = useLoaderData() as UnifiedEvent;
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Show sticky bar after scrolling past 400px (roughly past hero)
    setShowStickyBar(latest > 400);
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="relative z-10">
        <Main className="container mx-auto mt-24 px-4 md:px-6 lg:px-8 pb-24 md:pb-12">
          <EventHero event={event} />
          <LogisticsGrid event={event} />
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8 lg:mt-12">
            {/* Left Column - Progressive Disclosure */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <EventAccordion event={event} />
            </motion.div>
            {/* Right Column - Prize Module */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <PrizeModule event={event} />
            </motion.div>
          </div>
          <CoordinatorFooter event={event} />
        </Main>

      </div>
      <StickyMobileCTA
        event={event}
        isVisible={showStickyBar}
      />
    </div>
  );
}

