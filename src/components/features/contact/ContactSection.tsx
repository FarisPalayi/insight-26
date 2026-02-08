import { motion } from "framer-motion";
import { Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { ContactCard } from "./ContactCard";
import { contactFormSchema } from "./contact.schema";
import { CONTACTS } from "./contact.constants";
import { type ContactFormValues } from "./contact.schema";
import { contactService } from "./contact.service";


const TOAST_MESSAGES = {
  loading: "Sending message...",
  success: {
    title: "Message Sent!",
    description: "We'll get back to you as soon as possible.",
  },
  error: {
    title: "Failed to send message",
    description: "Please try again later.",
  },
} as const;

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

  const onSubmit = async (data: ContactFormValues) => {
    const toastId = toast.loading(TOAST_MESSAGES.loading);
    try {
      await contactService.sendMessage(data);

      toast.success(TOAST_MESSAGES.success.title, {
        id: toastId,
        description: TOAST_MESSAGES.success.description,
      });

      form.reset();
    } catch {
      toast.error(TOAST_MESSAGES.error.title, {
        id: toastId,
        description: TOAST_MESSAGES.error.description,
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
            {CONTACTS.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="glass-surface rounded-xl p-4 group hover:border-primary/30 transition-all duration-300 flex items-center gap-4"
              >
                <ContactCard person={person} key={index} />
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
