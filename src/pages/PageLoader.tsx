import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-8">
        {/* Circuit Node Loader */}
        <div className="relative w-20 h-20">
          {/* Orbiting rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: `1.5px solid hsl(var(--primary) / ${0.15 + i * 0.1})`,
                scale: 1 + i * 0.25,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 - i * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Node dot on each ring */}
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                style={{
                  boxShadow: '0 0 8px hsl(var(--primary) / 0.8), 0 0 20px hsl(var(--primary) / 0.4)',
                }}
              />
            </motion.div>
          ))}

          {/* Center pulse */}
          <motion.div
            className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-primary/80"
            style={{
              boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.3)',
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Brand text */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm font-mono tracking-[0.3em] text-primary/80 uppercase mt-6 md:mt-1">
            Insight'26
          </span>
        </motion.div>
      </div>
    </div>
  );
}
