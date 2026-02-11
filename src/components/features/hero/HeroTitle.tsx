import { useRef } from "react";

export const HeroTitle = () => {
  const titleRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={titleRef}
      className="mb-6 sm:mb-8 select-none"
    >
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
        <span className="title-insight inline-block text-gradient">
          INSIGHT
        </span>
        <span className="inline-block ml-2">
          <span className="title-year inline-block text-foreground">
            ’26
          </span>
        </span>
      </h1>

      <div
        className="title-underline hidden sm:block h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 sm:mt-6 max-w-xs sm:max-w-md origin-center"
        style={{
          boxShadow: "0 0 22px hsl(var(--primary) / 0.35)",
        }}
      />
    </div>
  );
};
