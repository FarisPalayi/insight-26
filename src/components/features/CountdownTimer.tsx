import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CountdownTimer = () => {
  const eventDate = new Date('2026-02-17T09:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-10 sm:mb-14"
    >
      <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-4">
        Event starts in
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center justify-center gap-2 sm:gap-4"
      >
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
            <motion.div
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl glass-surface flex items-center justify-center overflow-hidden">
                  <motion.span
                    key={unit.value}
                    className="text-xl sm:text-3xl font-bold text-gradient font-mono"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-primary/5 blur-xl -z-10 hidden md:block" />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-2 font-medium">
                {unit.label}
              </span>
            </motion.div>
            {index < timeUnits.length - 1 && (
              <motion.span
                className="text-xl sm:text-2xl text-primary/60 font-light hidden sm:block mb-5"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

