import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Users, Zap, Trophy } from "lucide-react";
import { Link } from "react-router";

export const FlagshipEvent = () => {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group "
    >

      {/* Subtle hover glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      {/* Main card */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Floating particles */}
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-3 h-3 bg-primary/40 rounded-full blur-sm"
          style={{ willChange: 'transform' }}
        />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left content */}
            <div className="flex-1 space-y-6">
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
                >
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Flagship Event</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20"
                >
                  <Trophy className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-medium text-accent">₹40K+ Prize Pool</span>
                </motion.div>
              </div>

              {/* Title with animated gradient */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                  <span className="text-foreground">Tech</span>
                  <span className="text-gradient">nova</span>
                  <span className="text-foreground/60 ml-2 text-4xl md:text-5xl lg:text-6xl">8.0</span>
                </h3>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                The ultimate battleground for tech enthusiasts. Code, compete, and conquer in our flagship technical championship.
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 pt-2"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">5+ Rounds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Team Event</span>
                </div>
              </motion.div>
            </div>

            {/* Right CTA area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col items-start lg:items-end gap-4"
            >
              <Button asChild>
                <Link to="/technova"
                  className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 gap-3 text-lg px-8 py-6 group/btn"
                >
                  Explore Event
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <span className="text-sm text-muted-foreground">Registration opens soon</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

