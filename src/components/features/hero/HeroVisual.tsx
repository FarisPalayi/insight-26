import { motion } from "framer-motion";

export const HeroVisual = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsl(160 100% 45% / 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, hsl(280 100% 60% / 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, hsl(200 100% 55% / 0.08) 0%, transparent 70%)
          `
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Geometric grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="hsl(160 100% 45% / 0.1)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(160 100% 45%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(160 100% 45%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#gridGradient)" />
      </svg>

      {/* Floating tech elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        >
          {i % 3 === 0 ? (
            // Hexagon
            <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-[0_0_20px_hsl(160_100%_45%_/_0.4)]">
              <path
                d="M40 5 L70 22.5 L70 57.5 L40 75 L10 57.5 L10 22.5 Z"
                fill="none"
                stroke="hsl(160 100% 45%)"
                strokeWidth="2"
              />
            </svg>
          ) : i % 3 === 1 ? (
            // Circuit-like square
            <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-[0_0_15px_hsl(280_100%_60%_/_0.3)]">
              <rect x="5" y="5" width="50" height="50" fill="none" stroke="hsl(280 100% 60%)" strokeWidth="2" />
              <circle cx="30" cy="30" r="8" fill="none" stroke="hsl(280 100% 60%)" strokeWidth="2" />
              <line x1="30" y1="5" x2="30" y2="22" stroke="hsl(280 100% 60%)" strokeWidth="2" />
              <line x1="30" y1="38" x2="30" y2="55" stroke="hsl(280 100% 60%)" strokeWidth="2" />
            </svg>
          ) : (
            // Triangle
            <svg width="70" height="70" viewBox="0 0 70 70" className="drop-shadow-[0_0_18px_hsl(200_100%_55%_/_0.35)]">
              <path
                d="M35 10 L60 55 L10 55 Z"
                fill="none"
                stroke="hsl(200 100% 55%)"
                strokeWidth="2"
              />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Large central focal element - tech circuit board inspired */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-20"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full">
          <defs>
            <linearGradient id="centralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(160 100% 45%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(200 100% 55%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(280 100% 60%)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle cx="250" cy="250" r="200" fill="none" stroke="url(#centralGradient)" strokeWidth="2" />
          <circle cx="250" cy="250" r="150" fill="none" stroke="url(#centralGradient)" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="100" fill="none" stroke="url(#centralGradient)" strokeWidth="1" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="250"
              y1="250"
              x2={250 + Math.cos((i * Math.PI) / 4) * 200}
              y2={250 + Math.sin((i * Math.PI) / 4) * 200}
              stroke="url(#centralGradient)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </motion.div>

      {/* Scanline effect for tech feel */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(160 100% 45% / 0.03) 2px, hsl(160 100% 45% / 0.03) 4px)'
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
