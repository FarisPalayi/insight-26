import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EventCategoryFilter } from "@/components/features/EventCategoryFilter";
import type { EventCategory } from "@/lib/data/unifiedEvents";

interface EventsSectionHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: EventCategory | "all";
  onCategoryChange: (category: EventCategory | "all") => void;
}

export function EventsSectionHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: EventsSectionHeaderProps) {
  return (
    <header className="relative md:pt-12 md:pb-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="text-gradient">Explore</span>{" "}
            <span className="text-foreground">Events</span>
          </h1>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events, venues..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="text-foreground pl-12 h-12 bg-card/60 border-border/50 rounded-xl focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Category Filter */}
          <EventCategoryFilter
            mode="single"
            selectedCategory={selectedCategory}
            onSelectCategory={onCategoryChange}
          />
        </motion.div>
      </div>
    </header>
  );
}
