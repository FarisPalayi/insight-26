import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { Link } from "react-router";

export const ContactCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="glass-surfce rounded-2xl px-2 py-4 md:py-8 md:px-3 relative text-center"
    >
      <div className="">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Still have questions?
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            You can call us, WhatasApp us or E-mail us
          </p>
          <Button variant="link" className="px-0">
            <Link to="/contact" className="flex items-center gap-2 transition-colors text-sm group">
              <Mail /> See the Contact Us page
            </Link>
          </Button>
        </div>
      </div>
    </motion.div >

  )
}
