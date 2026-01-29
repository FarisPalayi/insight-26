import { motion } from 'framer-motion';
import { categories, type EventCategory } from '@/lib/data/schedule';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategories: EventCategory[];
  onToggleCategory: (category: EventCategory) => void;
}

const categoryColorClasses: Record<EventCategory, { active: string; inactive: string }> = {
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

  return (
    <div className="mb-8">
      <h4 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">Filter by category</h4>
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Clear all filters
            categories.forEach((c) => {
              if (selectedCategories.includes(c.id)) {
                onToggleCategory(c.id);
              }
            });
          }}
          className={cn(
            'rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300',
            isAll
              ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(160_100%_45%/0.4)]'
              : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-muted-foreground/30'
          )}
        >
          All Events
        </motion.button>
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const colors = categoryColorClasses[category.id];

          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleCategory(category.id)}
              className={cn(
                'rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300',
                isSelected ? colors.active : colors.inactive
              )}
            >
              {category.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
