import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Zap, Crown } from 'lucide-react';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';

export function PrizeModule({ event }: { event: UnifiedEvent }) {
  const hasJackpot = !!event.prizes?.jackpotPrize;
  const hasStandardPrizes = !!(event.prizes?.first || event.prizePool);

  if (!hasJackpot && !hasStandardPrizes) return null;

  return (
    <div className="space-y-8">
      {/* Header with decorative line */}
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-primary whitespace-nowrap">
          Rewards & Recognition
        </h2>
        <div className="h-px w-full bg-gradient-to-r from-primary/30 to-transparent" />
      </div>

      <div className="grid gap-3">
        {/* 1. THE JACKPOT - Top Priority */}
        {event.prizes?.jackpotPrize && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-amber-500/50 bg-gradient-to-br from-amber-500/20 via-black to-black p-6 group"
          >
            {/* Animated Glow Background */}
            <div className="absolute -inset-2 bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-colors duration-700" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-500">
                  <Crown className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Grand Jackpot</span>
                </div>
                <p className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-[length:200%_auto] animate-shimmer">
                  {event.prizes.jackpotPrize}
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Zap className="w-7 h-7 text-amber-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. THE PODIUM - 1st, 2nd, 3rd */}
        <div className="grid gap-2">
          {/* First Place */}
          {(event.prizes?.first || event.prizePool) && (
            <PrizeRow
              label="First Place"
              amount={event.prizes?.first || event.prizePool || ""}
              icon={Trophy}
              variant="gold"
              index={1}
            />
          )}

          {/* Second Place */}
          {event.prizes?.second && (
            <PrizeRow
              label="Second Place"
              amount={event.prizes.second}
              icon={Medal}
              variant="silver"
              index={2}
            />
          )}

          {/* Third Place */}
          {event.prizes?.third && (
            <PrizeRow
              label="Third Place"
              amount={event.prizes.third}
              icon={Award}
              variant="bronze"
              index={3}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean mapping
const PrizeRow = ({ label, amount, icon: Icon, variant, index }: {
  label: string,
  amount: string,
  icon: any,
  variant: 'gold' | 'silver' | 'bronze',
  index: number
}) => {
  const styles = {
    gold: "text-amber-400 border-white/5 bg-white/[0.02]",
    silver: "text-slate-300 border-white/5 bg-white/[0.02]",
    bronze: "text-orange-800 border-white/5 bg-white/[0.02]"
  };

  return (
    <motion.div
      initial={{ x: -10 }}
      whileInView={{ x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:bg-white/[0.05] group",
        styles[variant]
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-current/30 transition-colors">
          <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest font-mono text-muted-foreground">{label}</p>
          <p className="text-lg font-bold tracking-tight text-foreground">{amount}</p>
        </div>
      </div>
      <div className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity uppercase">
        Rank 0{index}
      </div>
    </motion.div>
  );
};
