export const HeroVisual = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/circuite-green.webp")', // Replace with your chosen image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          filter: 'blur(0px) brightness(0.8)',
        }}
      />

      {/* Gradient overlay for brand colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(160 100% 45% / 0.12), transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, hsl(280 100% 60% / 0.08), transparent 50%),
            linear-gradient(180deg, transparent 0%, hsl(240 15% 3%) 100%)
          `
        }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(240 15% 3% / 0.7) 100%)'
        }}
      />
    </div>
  );
};
