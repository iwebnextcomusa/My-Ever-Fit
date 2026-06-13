import { useState, useEffect } from "react";
import { Dumbbell, Menu, X, Phone, Calendar, ArrowRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Philosophy", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Success", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Offset for sticky header
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-panel border-b border-white/5 shadow-2xl py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <img 
                src="/logo.svg" 
                alt="NRG Fitness Logo" 
                className="h-10 md:h-12 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-display font-bold text-xs uppercase tracking-widest text-[#a1a1aa] hover:text-white transition-all hover:translate-y-[-1px]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:5624400707"
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-300 hover:text-neon-green transition-all"
              >
                <Phone className="w-4 h-4 text-neon-green" /> (562) 440-0707
              </a>
              <button
                type="button"
                onClick={() => handleLinkClick("#booking-system")}
                className="px-6 py-2.5 rounded-full bg-neon-green text-black font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-neon-green/90 flex items-center gap-1.5 cursor-pointer"
              >
                Join Now
              </button>
            </div>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center justify-center"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide-in Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden top-[72px] bg-[#09090b]/95 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]">
          <div className="px-5 py-8 space-y-6 flex flex-col justify-between h-[calc(100vh-72px)] overflow-y-auto">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-display font-medium text-lg uppercase tracking-wider text-zinc-300 hover:text-white border-b border-white/5 py-2.5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-neon-green" />
                </a>
              ))}
            </nav>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <a
                href="tel:5624400707"
                className="p-4 rounded-xl border border-white/5 bg-[#18181b]/50 flex items-center gap-4 hover:bg-[#18181b]/80 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-neon-green/10 text-neon-green flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#fb923c] uppercase block">
                    FAST VOICE CALL
                  </span>
                  <span className="text-base font-display font-bold text-white">(562) 440-0707</span>
                </div>
              </a>

              <button
                type="button"
                onClick={() => handleLinkClick("#booking-system")}
                className="w-full py-4 rounded-full bg-neon-green text-black font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                Join Now <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
