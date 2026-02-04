import { motion } from 'framer-motion';
import { Phone, MessageCircle, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';

export function CoordinatorFooter({ event }: { event: UnifiedEvent }) {
  const coordinators = event.coordinators?.length
    ? event.coordinators
    : [{ name: 'Event Desk', phone: '919876543210' }];

  return (
    <section className="mt-20 pt-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Support Protocol</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Need Assistance?</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            Our coordinators are on standby to help with technical or logistical queries.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {coordinators.map((person, idx) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">{person.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{person.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent border-white/10 hover:bg-white/5 rounded-xl h-10 font-mono text-[10px] uppercase tracking-wider"
                onClick={() => window.open(`tel:${person.phone}`, '_self')}
              >
                <Phone className="w-3 h-3 mr-2" />
                Voice Call
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent border-primary/20 text-primary hover:bg-primary/5 rounded-xl h-10 font-mono text-[10px] uppercase tracking-wider"
                onClick={() => {
                  const cleanPhone = person?.phone?.replace(/\D/g, '');
                  window.open(`https://wa.me/${cleanPhone}`, '_blank');
                }}
              >
                <MessageCircle className="w-3 h-3 mr-2" />
                WhatsApp
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
