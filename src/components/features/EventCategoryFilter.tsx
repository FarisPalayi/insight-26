import { type EventCategory, categoryLabels } from '@/lib/data/unifiedEvents';
import { cn } from '@/lib/utils';
import { MotionButton } from '../ui/MotionButton';

// ============================================
// TYPES
// ============================================

type FilterMode = 'single' | 'multi';

interface BaseCategoryFilterProps {
  mode?: FilterMode;
  showLabel?: boolean;
  labelText?: string;
  className?: string;
}

interface SingleSelectProps extends BaseCategoryFilterProps {
  mode?: 'single';
  selectedCategory: EventCategory | 'all';
  onSelectCategory: (category: EventCategory | 'all') => void;
}

interface MultiSelectProps extends BaseCategoryFilterProps {
  mode: 'multi';
  selectedCategories: EventCategory[];
  onToggleCategory: (category: EventCategory) => void;
}

type EventCategoryFilterProps = SingleSelectProps | MultiSelectProps;

// ============================================
// CONSTANTS
// ============================================

const CATEGORIES: (EventCategory | 'all')[] = ['all', 'competition', 'cultural', 'allday'];

const CATEGORY_STYLES: Record<string, { active: string; inactive: string }> = {
  all: {
    active: 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]',
    inactive: 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground',
  },
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

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCategoryLabel(category: EventCategory | 'all'): string {
  if (category === 'all') return 'All Events';
  return categoryLabels[category];
}

// ============================================
// COMPONENT
// ============================================

export function EventCategoryFilter(props: EventCategoryFilterProps) {
  const {
    mode = 'single',
    showLabel = false,
    labelText = 'Filter by category',
    className,
  } = props;

  // Determine if a category is selected
  const isCategorySelected = (category: EventCategory | 'all'): boolean => {
    if (mode === 'single') {
      return (props as SingleSelectProps).selectedCategory === category;
    } else {
      // Multi-select mode
      if (category === 'all') {
        return (props as MultiSelectProps).selectedCategories.length === 0;
      }
      return (props as MultiSelectProps).selectedCategories.includes(category);
    }
  };

  // Handle category click
  const handleCategoryClick = (category: EventCategory | 'all') => {
    if (mode === 'single') {
      (props as SingleSelectProps).onSelectCategory(category);
    } else {
      // Multi-select mode
      if (category === 'all') {
        // Clear all selections
        const selectedCategories = (props as MultiSelectProps).selectedCategories;
        selectedCategories.forEach((cat) => {
          (props as MultiSelectProps).onToggleCategory(cat);
        });
      } else {
        (props as MultiSelectProps).onToggleCategory(category);
      }
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <h4 className="sm:text-center mb-3 md:mb-4 text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {labelText}
        </h4>
      )}
      <div className="flex sm:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 md:flex-wrap scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((category) => {
          const isSelected = isCategorySelected(category);
          const styles = CATEGORY_STYLES[category];

          return (
            <MotionButton
              variant="outline"
              key={category}
              size="sm"
              onClick={() => handleCategoryClick(category)}
              className={cn(
                'rounded-full px-4 md:px-5 transition-all duration-300 border whitespace-nowrap text-xs md:text-sm h-8 md:h-9 shrink-0',
                isSelected ? styles.active : styles.inactive
              )}
            >
              {getCategoryLabel(category)}
            </MotionButton>
          );
        })}
      </div>
    </div>
  );
}
