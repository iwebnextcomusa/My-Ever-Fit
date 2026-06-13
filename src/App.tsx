import React, { useState, useEffect } from "react";
import { 
  ArrowDown, 
  Check, 
  Flame, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  HeartPulse, 
  Activity, 
  ChevronRight, 
  ChevronUp, 
  ShieldCheck, 
  Award, 
  Clock, 
  Lock,
  ChevronDown
} from "lucide-react";

import ThreeCanvas from "./components/ThreeCanvas";
import Navigation from "./components/Navigation";
import TestimonialsSection from "./components/Testimonials";
import BookingCalendar from "./components/BookingCalendar";
import ContactForm from "./components/ContactForm";
import FaqSection from "./components/FaqSection";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

import { Service, Package } from "./types";

const coreServices: Service[] = [
  {
    id: "s1",
    title: "Personal Training",
    tagline: "1-on-1 private gym coaching",
    description: "Highly focused physical sessions targeting motor learning, progressive load, and safe biomechanical execution to maximum muscle recruiting.",
    benefits: ["Video movement analysis", "Bio-individual resistance profiling", "Physical gym session access"],
    imageUrl: "Personal Training Session Profile",
  },
  {
    id: "s2",
    title: "Online Coaching",
    tagline: "Anywhere structure & daily coaching lines",
    description: "Comprehensive remote guidance featuring personalized workouts, video assessments, daily tracker syncs, and weekly video accountability.",
    benefits: ["Complete app integration", "Flexible schedule structures", "Direct messenger chat access"],
    imageUrl: "Remote Coach Training App Dashboard",
  },
  {
    id: "s3",
    title: "Weight Loss Programs",
    tagline: "Metabolic rate optimization & nutrition",
    description: "Science-backed plans focusing on caloric density calibration and progressive calorie expenditure, avoiding sudden fad diets or exhaustion.",
    benefits: ["Metabolic speed assessment", "Habit transformation trackers", "Sustained fat-percent decline"],
    imageUrl: "Caloric Intake & Metabolic Acceleration",
  },
  {
    id: "s4",
    title: "Strength & Conditioning",
    tagline: "Athletic power, force output, and agility",
    description: "Physiology-first progressive overload programs designed to amplify dynamic force, peak torque output, and core system stability.",
    benefits: ["Force velocity optimization", "Central system conditioning", "Enhanced balance & bone density"],
    imageUrl: "Sub-maximal Overload Progressive Lifting",
  },
  {
    id: "s5",
    title: "Nutrition Guidance",
    tagline: "Caloric density & flexible macro profiling",
    description: "Detailed glycemic and macro analysis. We custom-structure your meal protocols around target foods you actually prefer to guarantee success.",
    benefits: ["Custom macro-nutrient ratios", "Grocery protocol booklets", "Anti-inflammatory guidelines"],
    imageUrl: "Flexible Macro Integration Protocol",
  },
  {
    id: "s6",
    title: "Custom Fitness Plans",
    tagline: "Biomechanically parsed athletic blueprints",
    description: "Complete individual exercise catalogs matching your exact range of motion constraints, height, leverages, and physical objectives.",
    benefits: ["Levers & physics matching", "Targeted rest/frequency guides", "Progressive modular layouts"],
    imageUrl: "Leverage and Physics-Mapped Blueprints",
  }
];

const servicePackages: Package[] = [
  {
    id: "p1",
    title: "ONLINE ELITE",
    price: "$149",
    billing: "Billed Monthly",
    popular: false,
    ctaText: "Acquire Online Access",
    features: [
      "Custom training plan in client app",
      "Calculated macro targets & food protocols",
      "Weekly bio-metric spreadsheet check-ins",
      "Direct coach support via in-app chat",
      "Performance and weight charts",
    ],
  },
  {
    id: "p2",
    title: "HYBRID ACCELERATE",
    price: "$299",
    billing: "Billed Monthly",
    popular: true,
    ctaText: "Acquire Hybrid Access",
    features: [
      "Everything in Online Elite tier",
      "4 Private 1-on-1 Gym Sessions/mo",
      "Live physical movement corrections",
      "Monthly body composition scan",
      "Priority messaging response duration",
    ],
  },
  {
    id: "p3",
    title: "ALPHA PRIVATE",
    price: "$499",
    billing: "Billed Monthly",
    popular: false,
    ctaText: "Acquire Private Access",
    features: [
      "Everything in Accelerate tier",
      "12 Private 1-on-1 Gym Sessions/mo",
      "Fully guided custom meal plans",
      "Quarterly biomechanical reviews",
      "Direct 24/7 emergency coach line",
      "Premium NRG Fitness gym apparel kit",
    ],
  },
];

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-[#09090b] font-sans">
      {/* Interactive ThreeJS Scene in background */}
      <ThreeCanvas />

      {/* Persistent Navigation */}
      <Navigation />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[#09090b]/70 to-[#09090b] pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-25 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left intro text & copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-bold text-neon-green uppercase tracking-tighter mb-4">
                <span className="w-2 h-2 rounded-full bg-neon-green mr-1 animate-pulse"></span>
                Available for New Clients in 2026
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-sans font-black italic uppercase leading-[0.9] tracking-tighter text-white">
                Transform <span className="text-zinc-600">Your</span> <br />
                Body, Elevate <span className="text-neon-green">Your Power.</span>
              </h1>

              <p className="text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
                Unlock your absolute physical potential. At <strong>NRG Fitness</strong>, we specialize in 1-on-1 private training, online metabolic architecture, and elite strength plans engineered to build pain-free performance and athletic longevity. No gimmicks, just results.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection("#booking-system")}
                  className="px-8 py-4 rounded-full bg-neon-green text-black font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-neon-green/90 hover:scale-[1.02] shadow-lg shadow-neon-green/10 cursor-pointer"
                >
                  Start consultation
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("#pricing")}
                  className="px-8 py-4 rounded-full border border-zinc-700 hover:border-zinc-500 hover:bg-white/5 text-white font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  View Packages <ArrowDown className="w-4 h-4 text-neon-cyan" />
                </button>
              </div>

              {/* Trust/Social Proof indicators */}
              <div className="pt-8 border-t border-zinc-800 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-white">98%</span>
                  <p className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase mt-0.5">Success Ratio</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-neon-green">100%</span>
                  <p className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase mt-0.5">Custom Programs</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-neon-cyan">500+</span>
                  <p className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase mt-0.5">Transformed</p>
                </div>
              </div>
            </div>

            {/* Right floating card visual */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="absolute inset-0 bg-radial-gradient from-neon-green/10 via-transparent to-transparent blur-3xl pointer-events-none" />

              <div className="rounded-[32px] glass-panel border border-zinc-800 p-8 space-y-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-neon-green/20">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-neon-green animate-pulse" />
                    <span className="font-mono text-[10px] text-zinc-400 font-bold tracking-widest uppercase">
                      METABOLIC ACCELEROMETRY
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-neon-green/10 text-neon-green rounded border border-neon-green/20">
                    REALTIME DISPATCH
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-zinc-850 bg-[#18181b]/85 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">TARGET METABOLIC RATE</span>
                      <span className="text-lg font-display font-extrabold text-white">2,840 kcal</span>
                    </div>
                    <Flame className="w-5 h-5 text-neon-pink" />
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-850 bg-[#18181b]/85 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">ACTIVE LOAD COMPLIANCE</span>
                      <span className="text-lg font-display font-extrabold text-white">92.4%</span>
                    </div>
                    <TrendingUp className="w-5 h-5 text-neon-green" />
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-850 bg-[#18181b]/85 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">BIO-INDIVIDUAL OVERLOAD</span>
                      <span className="text-lg font-display font-extrabold text-white">LEVEL 08 / APEX</span>
                    </div>
                    <HeartPulse className="w-5 h-5 text-neon-cyan" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection("#booking-system")}
                  className="w-full py-3.5 rounded-xl border border-neon-green/30 hover:border-neon-green text-neon-green bg-neon-green/5 hover:bg-neon-green/10 transition-all text-xs font-mono font-bold uppercase tracking-wider block text-center"
                >
                  Verify Your Vital Index
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 relative bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-mono font-medium tracking-widest border border-neon-cyan/20 mb-4 uppercase">
              <Zap className="w-3.5 h-3.5" /> PRECISION TRAINING MODES
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">
              Our Fitness <span className="text-neon-cyan">Services</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              We compile biomechanical analysis and flexible structural meal plans to develop high-efficacy, fail-proof fitness frameworks. Experience elite sports coaching.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-white/5 bg-[#12181F]/40 p-6 flex flex-col justify-between group hover:bg-[#12181F]/80 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/2 *:-translate-x-1 flex items-center justify-center font-mono font-bold text-xs">
                    0{service.id.replace("s", "")}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-white tracking-tight">
                      {service.title}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mt-0.5">
                      {service.tagline}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Bullet features */}
                  <div className="pt-4 space-y-2 border-t border-white/5">
                    {service.benefits.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-neon-cyan flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 relative z-10 flex">
                  <button
                    type="button"
                    onClick={() => {
                      scrollToSection("#booking-system");
                    }}
                    className="w-full py-3 rounded-xl border border-white/10 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-gray-300 group-hover:text-black group-hover:bg-neon-cyan group-hover:border-neon-cyan transition-all duration-300"
                  >
                    Select Focus Mode
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TRAINING PHILOSOPHY / ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/3 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Section Left */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="rounded-2xl border border-white/5 bg-[#090D13] p-6 text-left space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-2xl rounded-full" />
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-neon-pink/15 text-neon-pink border border-neon-pink/30 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white leading-tight">Coach Marcus Vance</h3>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">
                      Lead Sports Specialist
                    </span>
                  </div>
                </div>

                <blockquote className="text-gray-300 italic text-xs leading-relaxed border-l-2 border-neon-pink/40 pl-3">
                  "At NRG Fitness, we reject the legacy culture of fatigue and dehydration. Elite fitness is calculated. Your biomechanics and daily caloric thresholds determine your limits. Optimize these index points, and elite performance is effortless."
                </blockquote>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5 text-gray-400">
                    <span>SPECIALIZATION:</span>
                    <span className="text-white font-medium">Metabolic & Overload Physics</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/5 text-gray-400">
                    <span>ACCREDITATION:</span>
                    <span className="text-white font-medium">NSCA-CSCS Certification</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 text-gray-400">
                    <span>ATHLETIC DEPTH:</span>
                    <span className="text-white font-medium">14+ Years Active Performance</span>
                  </div>
                </div>

                {/* Micro tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Strength Elite", "Macro Blueprint", "Biomechanics"].map((t) => (
                    <span key={t} className="text-[9px] font-mono font-medium tracking-wide text-neon-cyan bg-neon-cyan/10 px-2.5 py-1 rounded border border-neon-cyan/20 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Copy Content Right */}
            <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-pink/10 text-neon-pink text-xs font-mono font-medium tracking-widest border border-neon-pink/20 mb-2 uppercase">
                <HeartPulse className="w-3.5 h-3.5" /> THE NRG FITNESS PHILOSOPHY
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none mb-4">
                Empowering Sustainable <br />
                <span className="text-neon-pink">Kinetic Transformation</span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Many modern gyms dictate uncalculated, heavy fatigue workouts that lead to joint degradation and mental exhaustion. At NRG Fitness, we implement **kinesiology-first techniques**.
              </p>

              <div className="space-y-4 font-display">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 mt-0.5 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green flex items-center justify-center font-mono text-[10px] font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white tracking-tight">Vitals & Physics Profiling</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                      We match your physical ratios and leg-to-torso leverages to specific physical resistance machines to optimize load pathing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 mt-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan flex items-center justify-center font-mono text-[10px] font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white tracking-tight">Flexible Food Threshold Mapping</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                      No generic food ban lists. We define your optimal protein thresholds and glycemic indexes so you can eat flexible foods.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 mt-0.5 rounded-full bg-neon-pink/10 border border-neon-pink/30 text-neon-pink flex items-center justify-center font-mono text-[10px] font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white tracking-tight">Structured progressive adaptation</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                      Weekly volume profiling inside the NRG Fitness App ensures you scale weights correctly to build muscles safely and maintain long-term metabolic health.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex">
                <button
                  type="button"
                  onClick={() => scrollToSection("#booking-system")}
                  className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 text-xs font-mono font-bold tracking-wider uppercase text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Acquire Our Strategy Protocol
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE PACKAGES & PRICING SECTION */}
      <section id="pricing" className="py-24 md:py-32 relative bg-black/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green/3 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-xs font-mono font-medium tracking-widest border border-neon-green/20 mb-4 uppercase">
              <Award className="w-3.5 h-3.5" /> INVEST IN LONGEVITY
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">
              Coaching Packages & <span className="text-neon-green">Investments</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Transparent, flat-rate pricing designed for all lifters. Custom enterprise options and specialized body builder presets are also structured during assessment calls. No hidden sign-up fees or penalty contracts.
            </p>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {servicePackages.map((pack) => (
              <div
                key={pack.id}
                className={`rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  pack.popular
                    ? "glass-panel-neon border-neon-green/30 bg-[#12181F]/90 shadow-2xl p-6 md:p-8 scale-[1.02] -translate-y-1"
                    : "glass-panel border-white/5 p-6 md:p-8"
                }`}
              >
                {/* Popular Badge */}
                {pack.popular && (
                  <div className="absolute top-4 right-4 text-[9px] font-mono font-bold tracking-widest text-black bg-neon-green px-2.5 py-1 rounded-full uppercase">
                    RECOMMENDED SYSTEM TIER
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-display font-bold text-white tracking-tight mb-2 uppercase">
                    {pack.title}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 my-6">
                    <span className="text-4xl md:text-5xl font-display font-extrabold text-white">
                      {pack.price}
                    </span>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                      / {pack.billing.split(" ")[1]}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-6 block pb-3 border-b border-white/5">
                    {pack.billing}
                  </p>

                  {/* List features */}
                  <ul className="space-y-3.5">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      scrollToSection("#booking-system");
                    }}
                    className={`w-full py-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer ${
                      pack.popular
                        ? "bg-neon-green text-black hover:bg-neon-green/90 shadow-[0_4px_20px_rgba(249,115,22,0.25)]"
                        : "border border-white/10 hover:border-white/30 text-white hover:bg-white/5"
                    }`}
                  >
                    {pack.ctaText}
                  </button>
                  <p className="text-[10px] text-gray-500 font-mono text-center mt-3 uppercase tracking-widest">
                    SSL Encrypted & Secures spots instantly
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee strip */}
          <div className="mt-16 p-5 rounded-2xl glass-panel max-w-4xl mx-auto border border-white/5 flex flex-col md:flex-row items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center border border-neon-cyan/25 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-tight font-display mb-0.5">
                Risk-Free 30-Day Physiological Progress Guarantee
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                If you follow your custom workout targets and food thresholds for 30 days and do not see measurable biometric progress in force output, stamina, or fat decline, we refund 100% of your investment immediately. No questions asked.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE BOOKING CONTAINER */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-25">
          <BookingCalendar />
        </div>
      </section>

      {/* CLIENT TESTIMONIALS & FAQ */}
      <TestimonialsSection />
      <FaqSection />

      {/* NEWSLETTER LEAD MAGNET ACCUMULATOR */}
      <section className="py-20 relative bg-black/50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-green/3 blur-3xl rounded-full" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mx-auto text-neon-cyan mb-2">
            <Lock className="w-5 h-5" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight">
            Claim Your Free <span className="text-neon-cyan">Bio-Overload Strategy Guide</span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Drop your email below to receive our 22-page science-backed manual on macro counting, kinetic joints mechanics, and metabolic speed optimization codes. No spam. 100% free.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-2xl max-w-md mx-auto text-neon-cyan text-sm font-medium animate-pulse">
              ✓ PDF dispatch complete! Syncing guide to your inbox.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="e.g. name@domain.com"
                className="flex-1 bg-[#12181F]/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-neon-cyan transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-neon-cyan text-black font-display font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-neon-cyan/90 cursor-pointer"
              >
                Send Blueprint
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT INFORMATION AND GOOGLE MAPS NODE */}
      <ContactForm />

      {/* Interactive Floating Chatbot widget */}
      <Chatbot />

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full border border-white/10 bg-[#12181F]/70 text-gray-400 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-2xl overflow-hidden glass-panel-neon hover:border-neon-green/30 cursor-pointer"
          aria-label="Scroll back index to top"
        >
          <ChevronUp className="w-5 h-5 text-neon-green animate-bounce" />
        </button>
      )}

      {/* Unified Global Footer */}
      <Footer />
    </div>
  );
}
