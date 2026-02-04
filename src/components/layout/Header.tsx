import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoLink } from "../ui/LogoLink";
import { Link, useLocation } from "react-router";

const navItems = [
  { label: "Events", href: "/events" },
  { label: "Schedule", href: "/schedule" },
  { label: "Venue", href: "/venue" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-surface mx-4 mt-4 rounded-2xl">
        <div className="container flex items-center justify-between h-16 px-6 min-w-full">
          <LogoLink />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link text-sm font-medium tracking-wide uppercase transition-colors ${location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link to="/register" className="glow-primary">
                Register Now
              </Link>
            </Button>
          </div>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-surface mx-4 mt-2 rounded-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors ${location.pathname === item.href
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Button asChild className="mt-4 glow-primary w-full">
                <Link to="/register">Register Now</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
