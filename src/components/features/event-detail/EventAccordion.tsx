import { motion } from 'framer-motion';
import { FileText, CheckCircle, Briefcase } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';

interface EventAccordionProps {
  event: UnifiedEvent;
}

// Sample content based on event category - in production, this would come from the event data
function getGuidelinesContent(event: UnifiedEvent): string[] {
  const baseGuidelines = [
    'All participants must carry a valid college ID card.',
    'Registration must be completed before the event starts.',
    'Decisions made by the judges will be final and binding.',
    'Any form of malpractice will lead to immediate disqualification.',
    'Participants should report to the venue 15 minutes before the scheduled time.',
  ];

  if (event.category === 'competition') {
    return [
      ...baseGuidelines,
      'Teams cannot be changed after registration.',
      'Use of external resources is prohibited unless specified.',
      'All submissions must be original work.',
    ];
  }

  return baseGuidelines;
}

function getEligibilityContent(event: UnifiedEvent): string[] {
  const baseEligibility = [
    'Open to all undergraduate and postgraduate students.',
    'Participants from any college/university can participate.',
    'Age limit: 18-25 years.',
  ];

  if (event.teamSize !== 'solo' && event.teamSize !== 'any') {
    baseEligibility.push(`Team must consist of ${event.teamSize.replace('-', ' to ')} members.`);
  }

  return baseEligibility;
}

function getPrerequisitesContent(event: UnifiedEvent): string[] {
  const basePrereqs = [
    'Bring your own laptop (if required for the event).',
    'Carry your registration confirmation.',
    'Bring a valid photo ID proof.',
  ];

  if (event.category === 'competition') {
    return [
      ...basePrereqs,
      'Ensure your laptop has all necessary software installed.',
      'Bring chargers and extension cords.',
      'Prepare any presentations in advance.',
    ];
  }

  if (event.category === 'seminar') {
    return [
      'Notebook and pen for taking notes.',
      'Questions prepared for the Q&A session.',
      'Business cards for networking (optional).',
    ];
  }

  return basePrereqs;
}

const accordionSections = [
  {
    id: 'guidelines',
    title: 'Guidelines & Rules',
    icon: FileText,
    getContent: getGuidelinesContent,
  },
  {
    id: 'eligibility',
    title: 'Eligibility Criteria',
    icon: CheckCircle,
    getContent: getEligibilityContent,
  },
  {
    id: 'prerequisites',
    title: 'What to Bring',
    icon: Briefcase,
    getContent: getPrerequisitesContent,
  },
];

export function EventAccordion({ event }: EventAccordionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Event Details</h2>

      <Accordion type="single" collapsible defaultValue="guidelines" className="space-y-3">
        {accordionSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + index * 0.08, duration: 0.3 }}
          >
            <AccordionItem
              value={section.id}
              className="glass-surface rounded-xl border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{section.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <ul className="space-y-3 ml-11">
                  {section.getContent(event).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
}
