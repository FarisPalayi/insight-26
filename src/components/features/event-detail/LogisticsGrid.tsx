import { motion } from "framer-motion";
import { Calendar, MapPin, Users, IndianRupee } from "lucide-react";
import {
  type UnifiedEvent,
  dayLabels,
  getVenueName,
  teamSizeLabels,
} from "@/lib/data/unifiedEvents";
import { Link } from "react-router";

interface LogisticsGridProps {
  event: UnifiedEvent;
}

interface LogisticItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  delay: number;
  isVenue?: boolean;
}

function LogisticItem({
  icon,
  label,
  value,
  subValue,
  delay,
  isVenue = false,
}: LogisticItemProps) {
  return (
    <motion.div
      className="glass-surface rounded-xl p-4 md:p-5 space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {!isVenue ? (
        <>
          <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span className="text-xs uppercase tracking-wider font-medium">
              {label}
            </span>
          </div>
          <p className="text-lg md:text-xl font-semibold text-foreground">
            {value}
          </p>
          {subValue && (
            <p className="text-sm text-muted-foreground">{subValue}</p>
          )}
        </>
      ) : (
        <Link to="/venues">
          <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span className="text-xs uppercase tracking-wider font-medium">
              {label}
            </span>
          </div>
          <p className="text-lg md:text-xl font-semibold text-foreground">
            {value}
          </p>
          {subValue && (
            <p className="text-sm text-muted-foreground">{subValue}</p>
          )}
        </Link>
      )}
    </motion.div>
  );
}

export function LogisticsGrid({ event }: LogisticsGridProps) {
  const logistics = [
    {
      icon: <Calendar className="w-4 h-4 text-primary" />,
      label: "Date",
      value: dayLabels[event.schedule.day],
      subValue: event.schedule.displayTime,
      isVenue: false,
    },
    {
      icon: <MapPin className="w-4 h-4 text-event-cultural" />,
      label: "Venue",
      value: getVenueName(event.venue),
      isVenue: true,
    },
    {
      icon: <Users className="w-4 h-4 text-event-seminar" />,
      label: "Team Size",
      value: teamSizeLabels[event.teamSize],
      isVenue: false,
    },
    {
      icon: <IndianRupee className="w-4 h-4 text-event-allday" />,
      label: "Entry Fee",
      value: event.entryFee,
      isVenue: false,
    },
  ];

  return (
    <section className="border-t border-b border-border/50 py-6 -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {logistics.map((item, index) => (
            <LogisticItem
              key={item.label}
              {...item}
              delay={0.15 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
