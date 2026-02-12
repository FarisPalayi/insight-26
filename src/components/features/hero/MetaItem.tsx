import { Calendar, MapPin } from "lucide-react";

export const DateMeta = () => {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl">
      <Calendar className="w-5 h-5 text-primary" />
      <span className="font-medium text-foreground">
        16 & 17 February 2026
      </span>
    </div>
  );
};

export const LocationMeta = () => {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl">
      <MapPin className="w-5 h-5 text-accent" />
      <span className="font-medium text-foreground">
        CCSIT CU Campus
      </span>
    </div>
  );
};
