import { motion } from 'framer-motion';
import { Phone, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';

interface CoordinatorFooterProps {
  event: UnifiedEvent;
}

// Default coordinators if event doesn't have specific ones
const defaultCoordinators = [
  { name: 'Event Coordinator', phone: '+91 98765 43210' },
  { name: 'Technical Support', phone: '+91 98765 43211' },
];

export function CoordinatorFooter({ event }: CoordinatorFooterProps) {
  const coordinators = event.coordinators?.length ? event.coordinators : defaultCoordinators;

  return (
    <motion.section
      className="mt-12 pt-8 border-t border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground">Need Help?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Contact our event coordinators for any queries
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {coordinators.map((coordinator, index) => (
          <motion.div
            key={coordinator.name}
            className="glass-surface rounded-xl p-4 min-w-[200px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + index * 0.1, duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{coordinator.name}</p>
                {coordinator.phone && (
                  <p className="text-xs text-muted-foreground">{coordinator.phone}</p>
                )}
              </div>
            </div>

            {coordinator.phone && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-9 text-xs gap-1.5 text-foreground"
                  onClick={() => window.open(`tel:${coordinator.phone}`, '_self')}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-9 text-xs gap-1.5 text-event-competition border-event-competition/30 hover:bg-event-competition/10"
                  onClick={() => {
                    const phone = coordinator.phone?.replace(/\s/g, '').replace('+', '');
                    window.open(`https://wa.me/${phone}`, '_blank');
                  }}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
