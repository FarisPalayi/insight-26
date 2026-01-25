import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, MessageCircle, Phone } from "lucide-react"

export const ContactCard = () => {
  const contactNumber = "+919876543210";
  const email = "insightcuc@gmail.com"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="glass-surface-strong rounded-2xl p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Still have questions?
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Our coordinators are just a message or call away.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="btn-outline-glow gap-2 text-foreground"
            asChild
          >
            <a href={`mailto:${email}`}>
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </Button>
          <Button
            className="btn-glow bg-primary text-primary-foreground gap-2"
            asChild
          >
            <a
              href={`https://wa.me/${contactNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {/* Quick contact info */}
      <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap gap-4 md:gap-8 text-sm text-muted-foreground">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Mail className="w-4 h-4" />
          {email}
        </a>
        <a
          href={`tel:${contactNumber}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Phone className="w-4 h-4" />
          {contactNumber}
        </a>
      </div>
    </motion.div >

  )
}
