import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVenueName, type TimelineOverview } from '@/lib/data/unifiedEvents';
import { Link } from 'react-router';
import { timelineDayOneData, timelineDayTwoData } from '@/lib/data/timelineData';
import { Button } from '@/components/ui/button';

export function TimelineOverview({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className={cn('relative pt-24 md:pt-32 lg:pt-40 bg-background overflow-hidden', className)}>
      <div className="grid-lines opacity-30" />

      <div className="text-foreground container relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-7xl font-bold font-sans tracking-tight">
              Event <span className="text-gradient">Timeline</span>
            </h2>
          </motion.div>

          <div ref={containerRef} className="relative min-h-[500px] mt-12 md:mt-20 w-full">
            {/* Responsive Central Line */}
            {/* Mobile: Left-aligned (16px from edge) | Desktop: Centered */}
            <div className="absolute left-[15.5px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

            <div className="absolute left-[15.5px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
              <motion.div
                className="w-full origin-top"
                style={{
                  height: lineHeight,
                  background: `linear-gradient(to bottom, transparent, hsl(var(--gradient-mid)), hsl(var(--gradient-end)))`
                }}
              />
            </div>

            <div className="space-y-0">
              {/* Day 1 Section */}
              <div className="mb-16 md:mb-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex md:justify-center mb-12 md:mb-20"
                >
                  <div className="relative z-30">
                    <div className="glass-surface-strong border border-white/20 rounded-full px-6 md:px-10 py-3 md:py-4 shadow-2xl">
                      <h3 className="text-xl md:text-3xl font-semibold font-sans tracking-tight">
                        Day 1
                      </h3>
                    </div>
                  </div>
                </motion.div>
                <EventList events={timelineDayOneData} />
              </div>

              {/* Day 2 Section */}
              <div className="mt-16 md:mt-24">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex md:justify-center mb-12 md:mb-20"
                >
                  <div className="relative z-30">
                    <div className="glass-surface-strong border border-white/20 rounded-full px-6 md:px-10 py-3 md:py-4 shadow-2xl">
                      <h3 className="text-xl md:text-3xl font-semibold font-sans tracking-tight">
                        Day 1
                      </h3>
                    </div>
                  </div>
                </motion.div>
                <EventList events={timelineDayTwoData} />
              </div>
            </div>
          </div>
        </div>
        <ScheduleCta />
      </div>
    </section>
  );
}

function EventList({ events }: { events: TimelineOverview[] }) {
  return (
    <div className="relative">
      {events.map((event, index) => {
        const isEven = index % 2 === 0;
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "relative flex flex-col md:flex-row items-start md:items-center mb-12 md:mb-24 last:mb-0",
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
          >
            {/* Content Side */}
            <div className={cn(
              "w-full md:w-[45%] pl-12 md:pl-0 text-left", // Mobile: Padding-left for the line | Desktop: 0
              isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
            )}>
              <div className={cn(
                "inline-flex items-center gap-2 text-primary font-mono text-[10px] md:text-xs mb-2 px-2 py-0.5 rounded ",
                isEven ? "md:flex-row-reverse" : "flex-row"
              )}>
                <span>{event.displayTime}</span>
              </div>

              <h3 className="text-xl md:text-3xl font-bold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors leading-tight">
                {event.name}
              </h3>

              <div className={cn(
                "hidden lg:flex items-center gap-2 text-muted-foreground text-xs md:text-sm",
                isEven ? "md:justify-end" : "md:justify-start"
              )}>
                <MapPin className="w-3.5 h-3.5 text-primary/50" />
                {getVenueName(event.venue)}
              </div>
            </div>

            {/* The Responsive Bullet Point */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-auto z-20">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full glass-surface-strong border-white/20 flex items-center justify-center shadow-2xl">
                <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-primary glow-primary" />
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse" />
              </div>
            </div>

            {/* Empty space for desktop zig-zag */}
            <div className="hidden md:block md:w-[45%]" />
          </motion.div>
        );
      })}
    </div>
  );
}

function ScheduleCta() {
  return (
    <div className="flex mt-20 lg:mt-0 items-center justify-center gap-6 w-full">
      <Button
        asChild
        className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 group rounded-xl"
      >
        <Link to="/schedule">
          See Fulle Schedule
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
}