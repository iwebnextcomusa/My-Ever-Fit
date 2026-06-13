import { Dumbbell, Instagram, Facebook, Youtube, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="bg-[#070B0E] border-t border-white/5 py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Branding */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center font-black text-black italic text-xl">
              E
            </div>
            <span className="font-display font-black italic uppercase tracking-tighter text-white text-lg leading-none">
              MyEver<span className="text-neon-green">Fit</span>
            </span>
          </div>
          <span className="text-[10px] font-mono font-medium tracking-widest text-[#fb923c] uppercase leading-none">
            Premium Sports Conditioning
          </span>
        </div>

        {/* Short coordinates summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-500 font-mono text-xs mb-8">
          <a href="tel:5624400707" className="hover:text-neon-green transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-neon-green" /> (562) 440-0707
          </a>
          <span className="hidden sm:inline text-white/5">|</span>
          <a href="mailto:coaching@myeverfit.us" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-neon-cyan" /> coaching@myeverfit.us
          </a>
          <span className="hidden sm:inline text-white/5">|</span>
          <span>© {currentYear} MyEverFit Group</span>
        </div>

        {/* Social handles */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-gray-400 hover:text-white transition-all flex items-center justify-center"
            aria-label="Filter direct social profile"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-gray-400 hover:text-white transition-all flex items-center justify-center"
            aria-label="Filter direct social profile"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 text-gray-400 hover:text-white transition-all flex items-center justify-center"
            aria-label="Filter direct social profile"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>

        {/* Mandatory developed by credit */}
        <div className="text-gray-600 text-xs mt-4">
          Developed by{" "}
          <a
            href="https://iwebnext.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-neon-cyan underline underline-offset-4 transition-colors font-semibold"
          >
            iWebNext
          </a>
        </div>

      </div>
    </footer>
  );
}
