import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  initials: string;
}

const contacts: ContactPerson[] = [
  {
    name: "Contact Person 1",
    role: "Event Coordinator",
    phone: "+919876543210",
    initials: "CP",
  },
  {
    name: "Contact Person 2",
    role: "Technical Lead",
    phone: "+919876543211",
    initials: "TL",
  },
  {
    name: "Contact Person 3",
    role: "Registration Head",
    phone: "+919876543212",
    initials: "RH",
  },
];

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(150, "Subject must be less than 150 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace("+", "")}`, "_blank");
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // TODO: implement email api
      toast.loading("Senting message...");
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send');

      toast.success("Message Sent!", {
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="relative px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Have questions about Insight'26? Reach out to our team or send us a message.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-surface rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Send us a Message
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-foreground">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 text-sm">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="name"
                              className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80 text-sm">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="name@email.com"
                              className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 text-sm">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What's this about?"
                            className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 text-sm">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your inquiry..."
                            className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full glow-primary bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    disabled={form.formState.isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          {/* Right Column - Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Quick Contact
            </h3>

            {/* Contact Cards */}
            {contacts.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="glass-surface rounded-xl p-4 group hover:border-primary/30 transition-all duration-300 flex items-center gap-4"
              >
                <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/40 transition-colors flex-shrink-0">
                  <AvatarImage src="" alt={person.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {person.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground font-medium text-sm">{person.name}</h4>
                  <p className="text-muted-foreground text-xs">{person.role}</p>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCall(person.phone)}
                    className="p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                    aria-label={`Call ${person.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp(person.phone)}
                    className="p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors duration-200"
                    aria-label={`WhatsApp ${person.name}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Email Card */}
            <motion.a
              href="mailto:insightcuc@gmail.com"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="glass-surface rounded-xl p-4 group hover:border-primary/30 transition-all duration-300 flex items-center gap-4 block"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Official Email</p>
                <p className="text-foreground font-medium text-sm truncate">insightcuc@gmail.com</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
