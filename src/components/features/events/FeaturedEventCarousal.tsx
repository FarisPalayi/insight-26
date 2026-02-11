import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeaturedEventCard } from './FeaturedEventCard';
import type { UnifiedEvent } from '@/lib/data/unifiedEvents';

interface FeaturedEventsCarouselProps {
  events: UnifiedEvent[];
}

export function FeaturedEventsCarousel({ events }: FeaturedEventsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    duration: 25,          // default physics (smoothest)
    containScroll: 'trimSnaps',
  },
  [
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  ]
);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const updateSlidesInView = useCallback(() => {
    if (!emblaApi) return;
    setSlidesInView(emblaApi.slidesInView());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Start autoplay
    if (emblaApi.plugins().autoplay) emblaApi.plugins().autoplay.stop(); // Ensure it starts fresh
    
    onSelect();
    updateSlidesInView();
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('slidesInView', updateSlidesInView);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('slidesInView', updateSlidesInView);
    };
  }, [emblaApi, onSelect, updateSlidesInView]);

  if (events.length === 0) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Carousel */}
      <div className="embla overflow-hidden px-4 sm:px-8 lg:px-12">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div 
            className="embla__container flex" 
            style={{ 
              touchAction: 'pan-y pinch-zoom',
              backfaceVisibility: 'hidden', // GPU optimization
            }}
          >
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className="embla__slide flex-[0_0_100%] min-w-0 transition-opacity duration-500"
                style={{
                  opacity: slidesInView.includes(index) ? 1 : 0.4,
                }}
              >
                <FeaturedEventCard event={event} index={0} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {events.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-6 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/90 backdrop-blur-md border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-xl z-10 transition-all duration-300 hover:scale-110"
            aria-label="Previous event"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-6 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/90 backdrop-blur-md border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-xl z-10 transition-all duration-300 hover:scale-110"
            aria-label="Next event"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </>
      )}

      {/* Pagination Dots */}
      {events.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="group relative p-2"
              aria-label={`Go to event ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            >
              <div
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  index === selectedIndex
                    ? 'w-8 bg-primary shadow-lg shadow-primary/50'
                    : 'w-2 bg-muted-foreground/30 group-hover:bg-muted-foreground/50 group-hover:w-3'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}