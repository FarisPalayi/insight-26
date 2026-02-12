import { FileText, CheckCircle, Briefcase, Zap, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';
import { motion } from 'framer-motion';

interface EventAccordionProps {
  event: UnifiedEvent;
}

export function EventAccordion({ event }: EventAccordionProps) {
  // This object mimics the structure of UnifiedEvent interface
  // In the future, imply use 'event[section.id]' directly
  const contentMap: Record<string, string[]> = {
    rulesAndGuidelines: event.rulesAndGuidelines || (
      [
        'All participants must carry a valid college ID card.',
        'Registration must be completed before the event starts.',
        'Decisions made by the judges will be final and binding.',
        'Any form of malpractice will lead to immediate disqualification.',
        'Participants should report to the venue 15 minutes before the scheduled time.',
        ...(event.category === 'competition' ? [
          'Teams cannot be changed after registration.',
          'Use of external resources is prohibited unless specified.',
          'All submissions must be original work.'
        ] : [])
      ]
    ),
    eligibility: event.eligibility || (
      [
        'Open to all undergraduate and postgraduate students.',
        'Participants from any college/university can participate.',
        'Age limit: 18-25 years.',
        ...(event.teamSize !== 'solo' && event.teamSize !== 'any'
          ? [`Team must consist of ${event.teamSize.replace('-', ' to ')} members.`]
          : [])
      ]
    ),
    whatToBring: event.whatToBring || [
      'Bring your own laptop (if required for the event).',
      'Carry your registration confirmation.',
      'Bring a valid photo ID proof.',
      ...(event.category === 'competition' ? [
        'Ensure your laptop has all necessary software installed.',
        'Bring chargers and extension cords.',
        'Prepare any presentations in advance.'
      ] : []),
    ]
  };

  const accordionSections = [
    {
      id: 'rulesAndGuidelines',
      title: 'Guidelines & Rules',
      icon: FileText,
    },
    {
      id: 'eligibility',
      title: 'Eligibility Criteria',
      icon: CheckCircle,
    },
    {
      id: 'whatToBring',
      title: 'What to Bring',
      icon: Briefcase,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground">
            Event Intelligence
          </h2>
          <p className="text-xs font-mono text-primary/60 uppercase tracking-widest">
            Detailed Protocols & Requirements
          </p>
        </div>
        <div className="hidden md:block h-px flex-1 mx-8 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {accordionSections.map((section, idx) => {
          const Icon = section.icon;
          const displayContent = contentMap[section.id] || [];

          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border-none group"
            >
              <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>div]:border-primary/50 [&[data-state=open]>div]:bg-primary/[0.03]">
                <div className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all duration-300 group-hover:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Section 0{idx + 1}</span>
                      <span className="text-lg font-bold tracking-tight uppercase">{section.title}</span>
                    </div>
                  </div>

                  <div className="mr-2 p-1 rounded-full bg-white/5 transition-transform duration-300 group-data-[state=open]:rotate-90">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-4 pb-2">
                <div className="grid md:grid-cols-2 gap-3 pl-4 md:pl-14">
                  {displayContent.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="relative p-4 rounded-lg bg-[#0A0A0A] border border-white/5 hover:border-primary/20 transition-colors group/item"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Zap className="w-3 h-3 text-primary opacity-30 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </p>
                      </div>

                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/0 group-hover/item:border-primary/30 transition-all rounded-tr-lg" />
                    </motion.div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
