import { useState } from "react";
import { Star, ArrowRight, TrendingUp, Sparkles, Award } from "lucide-react";
import { Testimonial } from "../types";

const clientTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Miller",
    role: "Mother of 2 & Business Owner",
    rating: 5,
    text: "NRG Fitness completely redefined my fitness approach. The macro coaching and custom progressive workouts allowed me to shed 22 lbs in 12 weeks while maintaining high energy. I feel stronger than I did in my 20s!",
    beforeImg: "From fatigued & constant back fatigue",
    afterImg: "Active, energetic, and fat-to-muscle transformation",
    stat: "-22 lbs & +6% Muscle Mass",
  },
  {
    id: "t2",
    name: "Marcus Vance",
    role: "Senior Software Engineer",
    rating: 5,
    text: "Sitting at a desk 10 hours a day destroyed my posture and core. Marcus and NRG Fitness crafted a science-backed routine integrating mobility. In 90 days, my deadlift rose by 85 lbs, posture is flawless, and chronic discomfort is completely gone.",
    beforeImg: "Slouched posture & constant shoulder strain",
    afterImg: "Functional muscle, athletic power, and pain-free joints",
    stat: "+85 lbs Lift & Pain-Free Joints",
  },
  {
    id: "t3",
    name: "Elena Rostova",
    role: "Corporate Executive",
    rating: 5,
    text: "The Online Coaching program from NRG Fitness is stellar. The weekly check-ins, macro target adjustments, and training routine optimized around my heavy travel schedule gave me a structured routine that is actually sustainable.",
    beforeImg: "Inconsistent workouts & travel-related burnout",
    afterImg: "Consistent daily routine, structured nutrition, and toned frame",
    stat: "Body Fat Dropped from 28% to 19%",
  },
];

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<string>(clientTestimonials[0].id);
  const activeTestimonial = clientTestimonials.find((t) => t.id === activeTab) || clientTestimonials[0];

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden bg-[#0A0F14]/50">
      {/* Decorative neon glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-xs font-medium tracking-wide mb-4 uppercase border border-neon-green/20">
            <Sparkles className="w-3 h-3" /> CLIENT SUCCESS STORIES
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">
            Real Transformations, <span className="text-neon-green">Sustainable</span> Results
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            We don't believe in quick-fix fad diets. These are real results from NRG Fitness clients who committed to a customized program tailored to their bio-individual needs and lifestyle.
          </p>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tabs Selector on Desktop, Horizontal Scroll on Mobile */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
            {clientTestimonials.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-shrink-0 lg:flex-shrink-1 text-left w-64 lg:w-full p-5 rounded-xl transition-all duration-300 border ${
                  activeTab === t.id
                    ? "glass-panel-neon border-neon-green/30 bg-[#12181F]/90 translate-x-1 lg:translate-x-2"
                    : "border-white/5 bg-[#12181F]/40 hover:bg-[#12181F]/60 text-gray-400 hover:text-white"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-display font-semibold text-white tracking-tight text-sm md:text-base">
                    {t.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-neon-green font-mono bg-neon-green/10 px-2 py-0.5 rounded border border-neon-green/10">
                    {t.stat.split(" ")[0]}
                  </span>
                </div>
                <p className="text-xs truncate text-gray-400">{t.role}</p>
                <div className="mt-2 flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Active Highlight Card */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 rounded-2xl glass-panel relative border border-white/5 shadow-2xl overflow-hidden min-h-[400px]">
            {/* Background grid accents */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none" />

            {/* Quote details */}
            <div className="flex flex-col justify-between relative z-10 h-full">
              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current animate-pulse" />
                  ))}
                </div>
                <p className="text-gray-300 italic text-base md:text-lg leading-relaxed mb-6 font-medium">
                  "{activeTestimonial.text}"
                </p>
              </div>

              <div>
                <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                  {activeTestimonial.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{activeTestimonial.role}</p>

                <div className="inline-flex items-center gap-2 bg-[#0A0F14]/80 border border-neon-green/30 px-3 py-1.5 rounded-lg text-neon-green text-xs font-mono font-medium tracking-wide shadow-md">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {activeTestimonial.stat}
                </div>
              </div>
            </div>

            {/* Before / After Concept Slider/Visual Illustration */}
            <div className="relative flex flex-col justify-between p-6 rounded-xl border border-white/5 bg-[#090D13] overflow-hidden group min-h-[250px]">
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" dir="ltr" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-6 bg-white/5 w-fit px-2.5 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5 text-neon-green" /> PHYSO-TRANSFORMATION TIMELINE
                </div>

                {/* Before Stage */}
                <div className="mb-6 relative pl-4 border-l border-white/10 group-hover:border-neon-pink/30 transition-colors duration-300">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neon-pink font-semibold">
                    BASELINE CONFIGURATION
                  </span>
                  <p className="text-sm text-gray-400 font-medium">
                    {activeTestimonial.beforeImg}
                  </p>
                </div>

                {/* Arrow Connector */}
                <div className="my-2 text-neon-green flex items-center justify-center translate-x-[-12px] opacity-80 animate-pulse">
                  <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                </div>

                {/* After Stage */}
                <div className="mt-4 relative pl-4 border-l border-neon-green/30 group-hover:border-neon-green transition-colors duration-300">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neon-green font-semibold flex items-center gap-1">
                    METABOLIC STRATA STATUS
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {activeTestimonial.afterImg}
                  </p>
                </div>
              </div>

              {/* Holographic scanner effect lines in background */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/40 to-transparent animate-[scan_2.5s_infinite_ease-in-out]" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          40%, 60% { opacity: 0.9; }
          50% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
