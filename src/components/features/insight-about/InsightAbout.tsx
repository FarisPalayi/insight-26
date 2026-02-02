import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Calendar, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const stats = [
  { label: "Years of Legacy", value: "23+", icon: Calendar, color: "text-primary" },
  { label: "Partner Colleges", value: "20+", icon: Users, color: "text-accent" },
  { label: "Prize Pool", value: "₹1 Lakh+", icon: Trophy, color: "text-yellow-500" },
  { label: "Flagship Events", value: "10+", icon: Award, color: "text-blue-400" },
];

export default function InsightAbout() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 lg:pt-40 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 md:w-[500px] h-72 md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 md:w-[400px] h-64 md:h-[400px] bg-accent/10 rounded-full blur-[70px] md:blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: The Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1  mx-auto lg:mx-0 glow-text-accent hidden ">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_hsla(var(--accent),0.5)]" />
              <span className="text-xs md:text-sm text-accent font-medium tracking-wide uppercase">INSIGHT LEGACY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display leading-[1.1] tracking-tight text-balance ">
              <span className="text-gradient">23 Years of </span><br className="hidden sm:block" />
              <span className="text-foreground">Digital Frontier.</span>
            </h2>

            <div className="space-y-4 md:space-y-6 max-w-xl mx-auto lg:mx-0">
              <div className="flex gap-3 md:gap-4 items-start text-left group">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary glow-primary shrink-0 transition-transform duration-300" />
                <p className="text-base md:text-xl text-foreground/70 leading-snug -medium transition-colors duration-300 ">
                  Kerala's premier National IT Fest, hosted by CCSIT, University of Calicut since 2003.
                </p>
              </div>

              <div className="flex gap-3 md:gap-4 items-start text-left group">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent [box-shadow:0_0_10px_hsla(var(--accent),0.5)] shrink-0 transition-transform duration-300" />
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed transition-colors duration-300">
                  Insight '26 merges two decades of tradition with raw future-tech energy. A proving ground built by students, for students.
                </p>
              </div>
            </div>

            <div className="pt-2 md:pt-4">
              <Button
                variant="ghost"
                className="group text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 text-base md:text-lg btn-outline-glow"
                asChild
              >
                <Link to="/events">
                  Explore all events
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: The Proof (Bento Grid) */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="stat-card"
              >
                <Card className="glass-surface glass-surface-strong h-full p-4 md:p-6 flex flex-col justify-between group border-white/5 relative overflow-hidden transition-all duration-500 hover:border-primary/30 min-h-[120px] md:min-h-[160px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-background/50 w-fit mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                    <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-3xl font-bold font-mono tracking-tighter mb-0.5 md:mb-1 group-hover:text-glow transition-all duration-300">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground font-medium uppercase tracking-wider md:tracking-wide">
                      {stat.label}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 p-1.5 md:p-3 opacity-20">
                    <div className="w-8 h-8 md:w-16 md:h-16 border-t border-r md:border-t-2 md:border-r-2 border-white/20 rounded-tr-lg md:rounded-tr-2xl" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
