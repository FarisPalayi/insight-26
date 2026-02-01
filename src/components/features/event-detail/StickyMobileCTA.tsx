import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';

interface StickyMobileCTAProps {
  event: UnifiedEvent;
  isVisible: boolean;
}

export function StickyMobileCTA({ event, isVisible }: StickyMobileCTAProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="glass-surface-strong border-t border-border/50 px-4 py-3 safe-area-inset-bottom">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{event.name}</p>
                <p className="text-xs text-muted-foreground">
                  {event.entryFee} {event.prizePool && `• Prize: ${event.prizePool}`}
                </p>
              </div>
              <Button
                size="sm"
                className="shrink-0 h-11 px-5 text-sm font-medium gap-2 rounded-xl">
                Register
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )
      }
    </AnimatePresence >
  );
}
