import { motion } from 'framer-motion';
import { categories, type EventCategory } from '@/lib/data/schedule';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MotionButton } from "@/components/ui/MotionButton"

interface CategoryFilterProps {
  selectedCategories: EventCategory[];
  onToggleCategory: (category: EventCategory) => void;
}

// Category colors using Tailwind v4 tokens
const categoryStyles: Record<EventCategory, { active: string; inactive: string }> = {
  seminar: {
    active: 'bg-event-seminar text-primary-foreground border-event-seminar shadow-[0_0_20px_hsl(200_100%_55%/0.4)]',
    inactive: 'bg-event-seminar/10 text-event-seminar border-event-seminar/30 hover:bg-event-seminar/20 hover:border-event-seminar/50',
  },
  competition: {
    active: 'bg-event-competition text-primary-foreground border-event-competition shadow-[0_0_20px_hsl(160_100%_45%/0.4)]',
    inactive: 'bg-event-competition/10 text-event-competition border-event-competition/30 hover:bg-event-competition/20 hover:border-event-competition/50',
  },
  cultural: {
    active: 'bg-event-cultural text-accent-foreground border-event-cultural shadow-[0_0_20px_hsl(280_100%_60%/0.4)]',
    inactive: 'bg-event-cultural/10 text-event-cultural border-event-cultural/30 hover:bg-event-cultural/20 hover:border-event-cultural/50',
  },
  allday: {
    active: 'bg-event-allday text-primary-foreground border-event-allday shadow-[0_0_20px_hsl(35_100%_55%/0.4)]',
    inactive: 'bg-event-allday/10 text-event-allday border-event-allday/30 hover:bg-event-allday/20 hover:border-event-allday/50',
  },
};

export function CategoryFilter({ selectedCategories, onToggleCategory }: CategoryFilterProps) {
  const isAll = selectedCategories.length === 0;

  const handleClearAll = () => {
    categories.forEach((c) => {
      if (selectedCategories.includes(c.id)) {
        onToggleCategory(c.id);
      }
    });
  };

  return (
    <div className="mb-8">
      <h4 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Filter by category
      </h4>
      <div className="flex flex-wrap gap-3">
        <MotionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variant={isAll ? "default" : "outline"}
          size="sm"
          onClick={handleClearAll}
          className={cn(
            'rounded-full px-5 transition-all duration-300 text-foreground bg-muted/50',
            isAll && 'shadow-[0_0_20px_hsl(160_100%_45%/0.4)] bg-primary'
          )}
        >
          All Events
        </MotionButton>

        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const styles = categoryStyles[category.id];

          return (
            <MotionButton
              key={category.id}
              // Motion props
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // Button props
              variant="outline"
              size="sm"
              onClick={() => onToggleCategory(category.id)}
              className={cn(
                'rounded-full px-5 transition-colors duration-300 border',
                isSelected ? styles.active : styles.inactive
              )}
            >
              {category.name}
            </MotionButton>
          );
        })}
      </div>
    </div>
  );
}
