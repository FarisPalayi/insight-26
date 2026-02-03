import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEventsByDay } from '@/lib/data/unifiedEvents';

interface TimelineProps {
  className?: string;
}

export function TimelineOverview({ className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Animation Logic for the filling line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className={cn('relative py-16 md:py-24 overflow-hidden relative', className)}>
      {/* Background Glows to match InsightAbout */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary py-1 px-4">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Event Schedule
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground font-display tracking-tight text-balance">
              Event <span className="text-gradient">Overview</span>
            </h2>
          </motion.div>

          {/* Day Toggle using Shadcn Tabs */}
          <Tabs defaultValue="1" className="mt-10 relative">
            <TabsList className="bg-muted/50 border border-white/5 p-1 h-12">
              <TabsTrigger value="1" className="px-8 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Day 01
              </TabsTrigger>
              <TabsTrigger value="2" className="px-8 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Day 02
              </TabsTrigger>
            </TabsList>

            {/* Day 1 Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12"
            >
              <div ref={containerRef} className="relative max-w-2xl mx-auto">
                {/* The Scrolling Line Track */}
                <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] rounded-full" />

                {/* The Filling Animation */}
                <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] overflow-hidden">
                  <motion.div
                    className="w-full bg-gradient-to-b from-primary via-accent to-primary shadow-[0_0_15px_rgba(var(--color-primary),0.5)]"
                    style={{ height: lineHeight }}
                  />
                </div>

                <div className="space-y-8 md:space-y-10">
                  <EventList day={1} />
                </div>
              </div>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function EventList({ day }: { day: 1 | 2 }) {
  const events = useMemo(() => {
    return getEventsByDay(day)
      .filter((e) => !e.isAllDay)
      .sort((a, b) => a.schedule.startTime.localeCompare(b.schedule.startTime));
  }, [day]);

  return (
    <>
      {events.map((event) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative pl-10 md:pl-14"
        >
          {/* Central Bullet */}
          <div className="absolute left-0 top-1.5 z-20">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-background border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <div className="h-2 w-2 rounded-full bg-primary group-hover:shadow-[0_0_10px_hsl(var(--color-primary))]" />
            </div>
          </div>

          {/* Event Details - Single Side for Readability */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8 pb-4 border-b border-white/5 transition-colors group-hover:border-primary/20">
            <div className="space-y-1">
              <h3 className="text-lg md:text-2xl font-bold font-display text-foreground transition-colors group-hover:text-primary">
                {event.name}
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground font-semibold">
                {event.venue}
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary/80 font-mono text-xs md:text-sm bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 w-fit">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              {event.schedule.displayTime}
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
