import { FooterBrand, FooterQuickLinks, FooterResources, FooterConnect } from "../features/footer"

const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-border/30 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <FooterBrand />
            <FooterQuickLinks />
            <FooterResources />
            <FooterConnect />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
