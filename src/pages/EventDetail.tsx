import { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
function EventDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 space-y-8">
        <Skeleton className="h-10 w-32" />
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-12 w-40" />
          </div>
          <Skeleton className="aspect-video rounded-2xl" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function EventNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
        <h1 className="text-2xl font-bold text-foreground">Event Not Found</h1>
        <p className="text-muted-foreground">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/events')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
      </div>
    </div>
  );
}


