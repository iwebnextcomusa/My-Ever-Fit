import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { FaqItem } from "../types";

const faqData: FaqItem[] = [
  {
    id: "f1",
    question: "How do the MyEverFit packages work? Is there an initial contract?",
    answer: "We offer both flexible month-to-month plans as well as discounted 3, 6, and 12-month program architectures. There are no surprise signup fees. General personal training plans start at $149/mo, with specific customization made during our free consultation.",
    category: "membership",
  },
  {
    id: "f2",
    question: "Do you adjust routines for people with past injuries or orthopedic limitations?",
    answer: "Absolutely. Our coaches are trained in structural anatomy and kinesiology. Every custom training program undergoes a deep biomechanical movement assessment. We customize angles, progressive loading, and joint angles to safely bypass and improve legacy injuries.",
    category: "training",
  },
  {
    id: "f3",
    question: "Are custom meal plans restrictive? Do I need to stop eating foods I love?",
    answer: "No. Our nutrition coaching utilizes a flexible macro-nutrient framework paired with bio-individual recommendations. We calculate your custom glycemic thresholds and metabolic rate so you can build premium body composition while retaining meal variety. No starvation or restriction.",
    category: "nutrition",
  },
  {
    id: "f4",
    question: "How do Online Coaching sessions compare to 1-on-1 private workouts?",
    answer: "Online Coaching is conducted via the state-of-the-art EverFit client dashboard. You receive step-by-step video exercise guides, weekly performance reviews, bio-metrics check-ins, and direct message lines with your coach. It is perfect for self-motivated individuals who want professional structure without physical session constraints.",
    category: "scheduling",
  },
  {
    id: "f5",
    question: "What is your rescheduling or session cancellation protocol?",
    answer: "We operate a strict 24-hour notification protocol for any booking modifications. This ensures our coaching availability remains optimal for all MyEverFit subscribers. Cancellations or changes made under 24 hours will forfeit that session credit.",
    category: "scheduling",
  },
  {
    id: "f6",
    question: "Can I combine personal gym training with home workouts?",
    answer: "Yes! Many of our physical personal training clients use hybrid plans. We prescribe your targeted high-intensity lifting protocols in our private facility, and map secondary aerobic workouts or active recovery protocols to do at home inside the client app.",
    category: "training",
  },
  {
    id: "f7",
    question: "What should I expect during my free assessment call?",
    answer: "Your initial 15-minute consultation is a virtual meeting with a lead MyEverFit coach. We will assess your historic physical baselines, talk through structural obstacles, calculate macro-nutrient thresholds, and outline which plan configuration maximizes your speed of results.",
    category: "membership",
  },
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("f1");

  const categories = [
    { key: "all", label: "ALL TOPICS" },
    { key: "membership", label: "MEMBERSHIPS" },
    { key: "training", label: "TRAINING PLANS" },
    { key: "nutrition", label: "NUTRITION" },
    { key: "scheduling", label: "SCHEDULING" },
  ];

  const filteredFaqs = activeCategory === "all"
    ? faqData
    : faqData.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden bg-[#0A0F14]/30">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-medium tracking-wide mb-4 uppercase border border-neon-cyan/20">
            <Sparkles className="w-3 h-3" /> COMMON INTEL QUEUES
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">
            Frequently Asked <span className="text-neon-cyan">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Get instant answers to the questions we receive most about our coaching mechanisms, training packages, or application mechanics.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                // Open first item of new category
                const first = cat.key === "all" ? faqData[0] : faqData.find(f => f.category === cat.key);
                if (first) setOpenId(first.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider transition-all border ${
                activeCategory === cat.key
                  ? "bg-neon-cyan border-neon-cyan text-black font-semibold shadow-lg"
                  : "border-white/5 bg-[#12181F]/30 hover:bg-[#12181F]/50 text-gray-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Faq List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "glass-panel-neon border-neon-cyan/25 bg-[#12181F]/80 p-5"
                    : "border-white/5 bg-[#12181F]/30 hover:bg-[#12181F]/50 p-5 cursor-pointer"
                }`}
                onClick={() => !isOpen && toggleFaq(faq.id)}
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4.5 h-4.5 flex-shrink-0 ${isOpen ? "text-neon-cyan" : "text-gray-500"}`} />
                    <h3 className="font-display font-medium text-white tracking-tight text-sm md:text-base">
                      {faq.question}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFaq(faq.id);
                    }}
                    className={`p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all`}
                  >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Answer Content */}
                <div
                  className={`mt-4 text-xs md:text-sm text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none mt-0"
                  }`}
                >
                  <p className="pt-2 border-t border-white/5">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
