import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Calendar, Award } from "lucide-react";
import { Link } from "react-router";

const stats = [
  { label: "Years of Legacy", value: "23", icon: Calendar, color: "var(--color-primary)" },
  { label: "Partner Colleges", value: "20+", icon: Users, color: "var(--color-accent)" },
  { label: "Prize Pool", value: "₹1L+", icon: Trophy, color: "hsl(45 100% 50%)" },
  { label: "Competitions", value: "10+", icon: Award, color: "hsl(200 100% 55%)" },
];

export default function InsightAbout() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Seamless Grid Background */}
      <div className="grid-lines opacity-[0.08]" />

      {/* Soft Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Typography & Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <span className="inline-block px-3 py-1 border border-white/10 rounded-sm bg-white/5 text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
              Insight Legacy
            </span>

            <h2 className="text-5xl text-foreground md:text-7xl font-bold tracking-tighter leading-[0.95] text-balance">
              23 Years of <br />
              <span className="text-gradient">Digital Frontier.</span>
            </h2>

            <div className="space-y-6 max-w-lg">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-sans">
                Kerala's premier National IT Fest, hosted by CCSIT, University of Calicut since 2003.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Insight '26 merges two decades of tradition with raw future-tech energy. A proving ground built by students, for students.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-primary hover:gap-4 transition-all"
              >
                Explore all events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: The Stats Grid (Bento) */}
          <div className="grid grid-cols-2 gap-4 text-foreground" data-speed="0.9">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-surface-strong p-6 border border-white/5 rounded-lg flex flex-col justify-between min-h-[160px] group hover:border-primary/30 transition-colors"
              >
                <div className="p-2 rounded-md bg-white/5 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter">
                    {stat.value}
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
