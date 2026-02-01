import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';

interface PrizeModuleProps {
  event: UnifiedEvent;
}

interface PrizeCardProps {
  position: string;
  prize: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  delay: number;
}

function PrizeCard({ position, prize, icon, accentColor, glowColor, delay }: PrizeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'glass-surface rounded-xl p-5 relative overflow-hidden',
        'border border-transparent transition-all duration-300',
        'hover:border-opacity-50',
        glowColor
      )}
      style={{
        borderColor: `hsl(var(${accentColor}) / 0.3)`,
      }}
    >
      {/* Glow Effect */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20"
        style={{ backgroundColor: `hsl(var(${accentColor}))` }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `hsl(var(${accentColor}) / 0.15)` }}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {position}
          </p>
          <p
            className="text-xl font-bold"
            style={{ color: `hsl(var(${accentColor}))` }}
          >
            {prize}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function PrizeModule({ event }: PrizeModuleProps) {
  if (!event.prizes && !event.prizePool) {
    return null;
  }

  const prizes = [
    {
      position: '1st Place',
      prize: event.prizes?.first || event.prizePool || '—',
      icon: <Trophy className="w-6 h-6" style={{ color: 'hsl(45, 100%, 55%)' }} />,
      accentColor: '--event-allday', // Gold/Amber
      glowColor: 'hover:shadow-[0_0_30px_event-allday]',
      show: !!event.prizes?.first || !!event.prizePool,
    },
    {
      position: '2nd Place',
      prize: event.prizes?.second || '—',
      icon: <Medal className="w-6 h-6 text-slate-300" />,
      accentColor: '--muted-foreground', // Silver
      glowColor: 'hover:shadow-[0_0_30px_muted-foreground]',
      show: !!event.prizes?.second,
    },
    {
      position: '3rd Place',
      prize: event.prizes?.third || '—',
      icon: <Award className="w-6 h-6" style={{ color: 'hsl(25, 70%, 50%)' }} />,
      accentColor: '--destructive', // Bronze-ish (using destructive as close to bronze)
      glowColor: 'hover:shadow-[0_0_30px_destructive]',
      show: !!event.prizes?.third,
    },
  ];

  const visiblePrizes = prizes.filter((p) => p.show);

  if (visiblePrizes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Prizes & Recognition</h2>

      <div className="space-y-3">
        {visiblePrizes.map((prize, index) => (
          <PrizeCard
            key={prize.position}
            position={prize.position}
            prize={prize.prize}
            icon={prize.icon}
            accentColor={prize.accentColor}
            glowColor={prize.glowColor}
            delay={0.4 + index * 0.1}
          />
        ))}
      </div>

      {/* Additional Info */}
      {event.prizePool && visiblePrizes.length > 1 && (
        <motion.p
          className="text-sm text-muted-foreground text-center pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Total Prize Pool: <span className="font-semibold text-foreground">{event.prizePool}</span>
        </motion.p>
      )}
    </div>
  );
}
