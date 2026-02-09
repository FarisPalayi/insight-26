import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';
import { Link } from 'react-router';

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
          {/* Glow Effect */}
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-t from-primary/20 via-accent/10 to-transparent blur-xl" />
          
          {/* Main Bar */}
          <div className="relative glass-surface-strong backdrop-blur-3xl border-t border-white/10 px-4 py-4 safe-area-bottom">
            <div className="flex items-center gap-4">
              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-primary truncate">
                    Limited Slots
                  </p>
                </div>
                <p className="font-bold text-base truncate">{event.name}</p>
              </div>

              {/* CTA Button */}
              <Button 
                asChild
                className="rounded-full px-6 h-12 btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase text-[11px] tracking-widest shadow-lg shadow-primary/20 flex-shrink-0 group"
              >
                <Link to={`${event.registrationLink}`} className="flex items-center gap-2">
                  Register
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}