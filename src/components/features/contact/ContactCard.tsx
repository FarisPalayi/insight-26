import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Phone } from "lucide-react"
import { type ContactPerson } from "@/types";

interface ContactCardProps {
  person: ContactPerson;
}

export const ContactCard = ({ person }: ContactCardProps) => {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace("+", "")}`, "_blank"); // Fixed syntax
  };

  return (
    <>
      <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-colors flex-shrink-0">
        <AvatarImage src={person?.img ?? ""} alt={person.name} />
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
          {person.initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h4 className="text-foreground font-medium text-sm">{person.name}</h4>
        <p className="text-muted-foreground text-xs">{person.role}</p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => handleCall(person.phone)}
          className="p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200 cursor-pointer"
          aria-label={`Call ${person.name}`} // Fixed syntax
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleWhatsApp(person.phone)}
          className="p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200 cursor-pointer"
          aria-label={`WhatsApp ${person.name}`} // Fixed syntax
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </>
  )
}
