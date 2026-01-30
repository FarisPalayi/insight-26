import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type EventCategory, eventCategories } from '@/lib/data/events';

interface EventCategoryFilterProps {
  selectedCategory: EventCategory | 'all';
  onSelectCategory: (category: EventCategory | 'all') => void;
}

// Category colors using semantic tokens
const categoryButtonStyles: Record<EventCategory, { active: string; inactive: string }> = {
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

export function EventCategoryFilter({ selectedCategory, onSelectCategory }: EventCategoryFilterProps) {
  const isAll = selectedCategory === 'all';

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant={isAll ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory('all')}
          className={cn(
            'rounded-full px-6 transition-all duration-300 border',
            isAll && 'shadow-[0_0_20px_hsl(var(--primary)/0.4)]'
          )}
        >
          All Events
        </Button>
      </motion.div>

      {eventCategories.map((category) => {
        const isSelected = selectedCategory === category.id;
        const styles = categoryButtonStyles[category.id];

        return (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                'rounded-full px-6 transition-all duration-300 border',
                isSelected ? styles.active : styles.inactive
              )}
            >
              {category.name}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
