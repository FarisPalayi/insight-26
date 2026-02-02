import { motion, AnimatePresence } from 'framer-motion';
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
          <div className="glass-surface-strong backdrop-blur-3xl border-t border-white/10 px-6 py-4 flex items-center gap-6">
            <div className="flex-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Limited Slots</p>
              <p className="font-bold text-lg">{event.name}</p>
            </div>
            <Button className="rounded-full px-8 h-12 font-black uppercase tracking-tighter glow-primary">
              Register Now
            </Button>
          </div>
        </motion.div>
      )
      }
    </AnimatePresence >
  );
}
