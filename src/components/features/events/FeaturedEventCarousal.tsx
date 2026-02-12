import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedEventCard } from "./FeaturedEventCard";
import type { UnifiedEvent } from "@/lib/data/unifiedEvents";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";

interface FeaturedEventsCarouselProps {
  events: UnifiedEvent[];
}

export function FeaturedEventsCarousel({ events }: FeaturedEventsCarouselProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType|null>(null);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  if (!events.length) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto">

      {/* ===== Navigation Arrows (Desktop only) ===== */}
      {events.length > 1 && !isMobile && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => swiperRef?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 h-11 w-11 rounded-full bg-background/90 backdrop-blur-sm shadow-md border"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => swiperRef?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 h-11 w-11 rounded-full bg-background/90 backdrop-blur-sm shadow-md border"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* ===== Swiper ===== */}
      <Swiper
        modules={[Pagination, Autoplay]}
        onSwiper={setSwiperRef}
        loop={true}
        centeredSlides={true}
        slidesPerView={1.08} // slight peek for premium feel
        spaceBetween={14}
        speed={420} // smooth, not floaty
        grabCursor={!isMobile}
        resistanceRatio={0.92}
        watchSlidesProgress={false}
        autoplay={
          isMobile
            ? false
            : {
                delay: 4200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "inline-block h-2 w-2 rounded-full p-1 mr-2 bg-muted-foreground/30 transition-all cursor-pointer ",
          bulletActiveClass:
            "!w-6 !bg-primary shadow-sm",
        }}
        className="px-4 sm:px-6 lg:px-10"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className="py-4">
            {/* subtle scale for depth — cheap GPU transform */}
            <div className="transition-transform duration-300 will-change-transform active:scale-[0.985]">
              <FeaturedEventCard event={event} index={0} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== Pretty Pagination ===== */}
      {events.length > 1 && (
        <div className="custom-pagination flex justify-center gap-2 mt-5" />
      )}
    </div>
  );
}