import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ListChecks, GraduationCap, Backpack } from "lucide-react";

export function EventFinePrint() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {/* GUIDELINES */}
      <AccordionItem value="rules" className="border rounded-xl px-4 bg-white">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3 font-semibold text-slate-700">
            <ListChecks className="w-5 h-5 text-blue-500" />
            Guidelines & Rules
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-slate-600 leading-relaxed pb-4">
          <ul className="list-disc ml-5 space-y-2">
            <li>Standard plagiarism rules apply; all code must be original.</li>
            <li>Usage of AI tools is restricted unless stated otherwise by mentors.</li>
            <li>Decision of the judges will be final and binding.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      {/* ELIGIBILITY */}
      <AccordionItem value="eligibility" className="border rounded-xl px-4 bg-white">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3 font-semibold text-slate-700">
            <GraduationCap className="w-5 h-5 text-purple-500" />
            Eligibility
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-slate-600 pb-4">
          This event is open to all Undergraduate and Postgraduate students currently enrolled in any recognized college/university. Cross-college teams are permitted.
        </AccordionContent>
      </AccordionItem>

      {/* PREREQUISITES */}
      <AccordionItem value="bring" className="border rounded-xl px-4 bg-white">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3 font-semibold text-slate-700">
            <Backpack className="w-5 h-5 text-orange-500" />
            What to Bring
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-slate-600 pb-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-slate-50 rounded-md border border-dashed border-slate-200 text-sm italic">
              ✔ Laptop & Charger
            </div>
            <div className="p-2 bg-slate-50 rounded-md border border-dashed border-slate-200 text-sm italic">
              ✔ Extension Cord
            </div>
            <div className="p-2 bg-slate-50 rounded-md border border-dashed border-slate-200 text-sm italic">
              ✔ Physical College ID
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
