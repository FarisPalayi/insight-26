import { motion } from 'framer-motion';
import { Zap, MapPin } from 'lucide-react';
import { type ScheduleEvent } from '@/lib/data/schedule';

interface AllDayBannerProps {
  events: ScheduleEvent[];
}

export function AllDayBanner({ events }: AllDayBannerProps) {
  if (events.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 overflow-hidden rounded-xl border border-event-allday/30 bg-event-allday/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-event-allday/20 bg-event-allday/10 px-5 py-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-event-allday/20">
          <Zap className="h-4 w-4 text-event-allday" />
        </div>
        <span className="font-display text-sm font-semibold text-event-allday uppercase tracking-wider">
          All Day Events
        </span>
      </div>
      <div className="flex flex-wrap gap-4 p-5">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 rounded-lg bg-card/50 border border-border/50 px-5 py-3 transition-all hover:border-event-allday/30 hover:shadow-[0_0_20px_hsl(35_100%_55%/0.1)]"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-event-allday animate-pulse shadow-[0_0_10px_hsl(35_100%_55%/0.5)]" />
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">{event.name}</span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {event.venue}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
