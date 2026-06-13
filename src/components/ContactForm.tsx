import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      tempErrors.email = "Please enter a valid email.";
    }
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name] : "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", goals: "", message: "" });
      } else {
        setErrors({ general: data.error || "An error occurred." });
      }
    } catch (err) {
      console.error("Contact Form error:", err);
      setErrors({ general: "Could not reach database. Please try calling (562) 440-0707 directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Coordinates & Visual Map Placeholder */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3 block">
                  CONTACT DETAILS
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">
                  Let's Work <br />
                  Together.
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Have questions about our fitness packs or scheduling options? Hit our phone lines directly or complete the contact form. We answer all submissions in less than 4 hours.
                </p>
              </div>

              {/* Coordinates block */}
              <div className="space-y-4">
                {/* Phone Call block */}
                <a
                  href="tel:5624400707"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#12181F]/40 hover:bg-[#12181F]/70 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-neon-green/10 text-neon-green flex items-center justify-center border border-neon-green/20 group-hover:scale-105 transition-transform duration-300">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      VOICE COMM CALLS
                    </span>
                    <span className="text-lg font-display font-bold text-white group-hover:text-neon-green transition-colors">
                      (562) 440-0707
                    </span>
                  </div>
                </a>

                {/* Email block */}
                <a
                  href="mailto:coaching@nrgfitness.us"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#12181F]/40 hover:bg-[#12181F]/70 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center border border-neon-cyan/20 group-hover:scale-105 transition-transform duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      EMAIL GENERAL
                    </span>
                    <span className="text-base font-display font-medium text-white group-hover:text-neon-cyan transition-colors">
                      coaching@nrgfitness.us
                    </span>
                  </div>
                </a>

                {/* Address block */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#12181F]/20">
                  <div className="w-12 h-12 rounded-xl bg-white/5 text-gray-400 flex items-center justify-center border border-white/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      HQ LOCATION
                    </span>
                    <span className="text-xs text-gray-300">
                      NRG Fitness Pro Gyms, Long Beach, CA 90802
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Holographic Placeholder */}
            <div className="relative rounded-2xl border border-white/5 bg-black/60 overflow-hidden group p-6 min-h-[220px]">
              {/* Abstract map lines using CSS styling & coordinates marker */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-neon-cyan uppercase block mb-1">
                      GOOGLE MAP AREA INTEL
                    </span>
                    <h4 className="text-sm font-semibold text-white">Long Beach Sector Node</h4>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 border border-white/10 px-2 py-0.5 rounded">
                    GPS ACTIVES
                  </span>
                </div>

                {/* Cyber map representation */}
                <div className="h-20 w-full relative flex items-center justify-center rounded border border-white/5 bg-white/2">
                  <div className="absolute inset-0 " />
                  {/* Neon Grid Rings representing signal range */}
                  <div className="absolute w-12 h-12 rounded-full border border-neon-green/10 animate-ping" />
                  <div className="absolute w-28 h-28 rounded-full border border-neon-cyan/5" />
                  
                  {/* Point Coordinate */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-4.5 h-4.5 bg-neon-green rounded-full opacity-35 animate-ping" />
                    <span className="w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-black" />
                  </div>
                  
                  {/* Diagonal grid streets representation */}
                  <span className="absolute left-4 top-1/2 w-20 h-0.5 bg-white/5 rotate-12" />
                  <span className="absolute right-6 top-1/3 w-32 h-0.5 bg-white/5 -rotate-45" />
                  <span className="absolute left-8 bottom-4 w-40 h-0.5 bg-white/3 rotate-45" />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>LAT: 33.7701° N</span>
                  <span>LNG: 118.1937° W</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Request Form */}
          <div className="lg:col-span-7 rounded-2xl glass-panel border border-white/5 p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-green/2 blur-[80px] rounded-full pointer-events-none" />

            {submitSuccess ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-14 h-14 bg-neon-green/10 border border-neon-green/25 rounded-full flex items-center justify-center mx-auto text-neon-green">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white tracking-tight">
                    Message Swifly Transmitted!
                  </h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to NRG Fitness. Our coaching dispatch division has received your goals. Expect a response or call in a few hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-mono font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="text-lg font-display font-medium text-white tracking-tight">
                    Inquire Online Coaching or Gym Details
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    All submitted protocols are secure. Fields marked with asterisk are required.
                  </p>
                </div>

                {errors.general && (
                  <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-xl text-red-200 text-xs font-medium">
                    {errors.general}
                  </div>
                )}

                {/* Row: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wider">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rachel Adams"
                      className={`w-full bg-[#12181F]/30 border rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-neon-green transition-all ${
                        errors.name ? "border-red-500/50" : "border-white/10"
                      }`}
                    />
                    {errors.name && <span className="text-[10px] font-mono text-red-400">{errors.name}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wider">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rachel@example.com"
                      className={`w-full bg-[#12181F]/30 border rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-neon-green transition-all ${
                        errors.email ? "border-red-500/50" : "border-white/10"
                      }`}
                    />
                    {errors.email && <span className="text-[10px] font-mono text-red-400">{errors.email}</span>}
                  </div>
                </div>

                {/* Phone details */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wider">
                    BEST PHONE VOICE LINE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. (562) 555-0199"
                    className="w-full bg-[#12181F]/30 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-neon-green transition-all"
                  />
                </div>

                {/* Target Goals */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wider">
                    TARGET MEMBERSHIP GOALS
                  </label>
                  <input
                    type="text"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="Weight Loss, Strength Conditioning, Custom Meal Plans, etc..."
                    className="w-full bg-[#12181F]/30 border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-neon-green transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wider">
                    YOUR ENQUIRIES *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message, specific coaching package questions, or health challenges..."
                    className={`w-full bg-[#12181F]/30 border rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-neon-green transition-all resize-none ${
                      errors.message ? "border-red-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.message && <span className="text-[10px] font-mono text-red-400">{errors.message}</span>}
                </div>

                {/* Bottom Consent and Submit */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-neon-green" /> SSL Secure & Spam Guards Enabled
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neon-green text-black hover:bg-neon-green/90 transition-all font-display font-semibold flex items-center justify-center gap-2 hover:translate-x-0.5 cursor-pointer disabled:opacity-50"
                  >
                    Send Protocol Msg <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
