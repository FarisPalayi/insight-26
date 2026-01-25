import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}

export const StatCard = ({ value, label, icon, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
    className="glass-surface rounded-xl p-5 flex items-center gap-4 group hover:border-primary/20 transition-colors duration-300"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors">
      {icon}
    </div>
    <div>
      <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  </motion.div>
);

