import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DayTabsProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function DayTabs({ selectedDay, onSelectDay }: DayTabsProps) {
  return (
    <div className="mb-10 flex justify-center">
      <div className="inline-flex rounded-2xl border border-border bg-card/60 p-2 backdrop-blur-sm shadow-lg">
        {[1, 2].map((day) => (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={cn(
              'relative rounded-xl px-10 py-4 font-display text-lg font-semibold transition-all duration-300',
              selectedDay === day
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {selectedDay === day && (
              <motion.div
                layoutId="activeDay"
                className="absolute inset-0 rounded-xl bg-primary shadow-[0_0_30px_hsl(160_100%_45%/0.3)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Day {day}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
