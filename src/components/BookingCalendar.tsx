import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle2, ChevronRight, ChevronLeft, ArrowLeft, Loader2 } from "lucide-react";

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("General Training Consultation");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  // Simple date generator for the next 14 days
  const getNextDays = () => {
    const days = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip Sundays for coaching sessions
      if (d.getDay() === 0) continue;

      days.push({
        dayOfWeek: weekdays[d.getDay()],
        dayOfMonth: d.getDate(),
        month: months[d.getMonth()],
        fullString: d.toISOString().split("T")[0],
        readable: `${weekdays[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`,
      });
    }
    return days;
  };

  const daysList = getNextDays();

  const timeSlots = [
    "07:00 AM",
    "08:30 AM",
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  const servicesList = [
    "Personal Training Consultation",
    "Online Coaching Integration",
    "Weight Loss Program Roadmap",
    "Strength & Conditioning Check",
    "Nutrition Protocol Session",
    "Custom Fitness Plan Sync",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1 && !service) {
      setError("Please select a fitness consultation service.");
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      setError("Please specify both a Date and a Time Slot.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!clientData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!clientData.email.trim() || !clientData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!clientData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          service,
          date: selectedDate,
          time: selectedTime,
          goals: clientData.goals,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessData(data.booking);
        setStep(4);
      } else {
        setError(data.error || "An error occurred. Please try scheduling again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("Database sync failed. Please try again or call (562) 440-0707 directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const readableDate = daysList.find((d) => d.fullString === selectedDate)?.readable || selectedDate;

  return (
    <div id="booking-system" className="w-full rounded-2xl glass-panel relative border border-white/5 shadow-2xl p-6 md:p-8 overflow-hidden">
      {/* Visual neon scanner flare */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent animate-[flowScanner_4s_infinite_ease-in-out]" />

      {/* Steps Indicator */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase">
              RESERVATION QUEUE
            </span>
            <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-ping" />
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
            <span className={step >= 1 ? "text-neon-cyan" : ""}>01</span>
            <span>/</span>
            <span className={step >= 2 ? "text-neon-cyan" : ""}>02</span>
            <span>/</span>
            <span className={step >= 3 ? "text-neon-cyan" : ""}>03</span>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm font-medium animate-pulse">
          {error}
        </div>
      )}

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-display font-medium text-white tracking-tight mb-2">
              Step 1: Choose Your Core Focus
            </h3>
            <p className="text-gray-400 text-sm">
              Select the program option you are most interested in exploring during the consultation call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {servicesList.map((srv) => (
              <button
                key={srv}
                type="button"
                onClick={() => setService(srv)}
                className={`p-4 rounded-xl text-left font-display font-medium text-sm transition-all duration-300 border ${
                  service === srv
                    ? "glass-panel-neon border-neon-cyan/40 bg-[#12181F]/90 text-white shadow-lg"
                    : "border-white/5 bg-[#12181F]/30 hover:bg-[#12181F]/50 text-gray-300 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{srv}</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      service === srv ? "border-neon-cyan bg-neon-cyan" : "border-white/30"
                    }`}
                  >
                    {service === srv && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-black hover:bg-neon-cyan/90 transition-all font-display font-semibold hover:translate-x-1"
            >
              Configure Schedule <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date and Time Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-display font-medium text-white tracking-tight mb-2">
              Step 2: Micro-Schedule Slot selection
            </h3>
            <p className="text-gray-400 text-sm">
              Please choose an available appointment date and preferred time window for your assessment call.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-mono font-bold uppercase text-neon-cyan tracking-wider">
              1. Choose Assessment Date (Sundays Closed)
            </label>
            <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-none snap-x">
              {daysList.map((d) => (
                <button
                  key={d.fullString}
                  type="button"
                  onClick={() => setSelectedDate(d.fullString)}
                  className={`flex-shrink-0 w-20 py-3 rounded-xl text-center flex flex-col justify-center gap-1 transition-all border snap-start ${
                    selectedDate === d.fullString
                      ? "glass-panel-neon border-neon-cyan/50 bg-[#12181F]/90 text-white"
                      : "border-white/5 bg-[#12181F]/30 hover:bg-[#12181F]/50 text-gray-300"
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono text-gray-500">{d.dayOfWeek}</span>
                  <span className="text-lg font-display font-bold">{d.dayOfMonth}</span>
                  <span className="text-[9px] uppercase font-mono text-gray-400">{d.month}</span>
                </button>
              ))}
            </div>

            <label className="block text-xs font-mono font-bold uppercase text-neon-cyan tracking-wider pt-2">
              2. Preferential Coordinated Time
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono text-center transition-all border ${
                    selectedTime === slot
                      ? "bg-neon-cyan border-neon-cyan text-black font-semibold"
                      : "border-white/5 bg-[#12181F]/30 hover:bg-[#12181F]/50 text-gray-300"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1 pointer-events-none" /> {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <button
              onClick={handlePrevStep}
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-gray-400 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Focus Option
            </button>
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan text-black hover:bg-neon-cyan/90 transition-all font-display font-semibold hover:translate-x-1"
            >
              Client Intel <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Client Intel Forms */}
      {step === 3 && (
        <form onSubmit={handleSubmitBooking} className="space-y-5">
          <div>
            <h3 className="text-xl font-display font-medium text-white tracking-tight mb-2">
              Step 3: Account & Vital Information
            </h3>
            <p className="text-gray-400 text-sm">
              Provide your details so our team can prepare for your fitness screening call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono text-gray-400 uppercase">FULL NAME *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={clientData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#12181F]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-cyan transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono text-gray-400 uppercase">EMAIL ADDRESS *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={clientData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. name@domain.com"
                  className="w-full bg-[#12181F]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-cyan transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] font-mono text-gray-400 uppercase">MOBILE VOICE NUMBER *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={clientData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. (562) 440-0707"
                  className="w-full bg-[#12181F]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-cyan transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-[11px] font-mono text-gray-400 uppercase">
                TARGET WELLNESS GOALS & ATHLETIC MOTIVATIONS
              </label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                <textarea
                  name="goals"
                  rows={3}
                  value={clientData.goals}
                  onChange={handleInputChange}
                  placeholder="Tell us about your fitness history, specific goals, or chronic obstacles..."
                  className="w-full bg-[#12181F]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-cyan transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center justify-between pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-gray-400 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Schedule Configuration
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-neon-cyan text-black hover:bg-neon-cyan/90 transition-all font-display font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Scheduling...
                </>
              ) : (
                <>
                  Authorize Booking <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Success Message */}
      {step === 4 && successData && (
        <div className="py-8 text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
          <div className="w-16 h-16 bg-neon-green/15 rounded-full flex items-center justify-center mx-auto text-neon-green border border-neon-green/30">
            <CheckCircle2 className="w-10 h-10 animate-[scaleIn_0.3s_ease-out]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight">
              Assessment Confirmed!
            </h3>
            <p className="text-gray-400 max-w-lg mx-auto text-sm">
              We have locked in your spot in the NRG Fitness consultation queue. An expert coach will reach out to you via the contact info provided shortly.
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/5 border border-white/5 text-left grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="col-span-2 pb-2 border-b border-white/5 text-center text-neon-cyan tracking-wider font-semibold">
              COORDINATED BOOKING MANIFEST
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">SERVICE LEVEL</span>
              <span className="text-white font-medium">{successData.service}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">BOOKING ID</span>
              <span className="text-gray-300">{successData.id}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">DATE SCHEDULED</span>
              <span className="text-white font-medium">{readableDate}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">TIME WINDOW</span>
              <span className="text-white font-medium">{successData.time}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-white/5">
              <span className="text-gray-500 block mb-0.5">CLIENT REGISTERED</span>
              <span className="text-white">{successData.name} ({successData.phone})</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500">
            Need to change or cancel? Give us a call directly at <span className="text-white font-medium">(562) 440-0707</span>.
          </p>

          <button
            onClick={() => {
              setStep(1);
              setClientData({ name: "", email: "", phone: "", goals: "" });
              setSelectedDate("");
              setSelectedTime("");
            }}
            className="px-6 py-2 rounded-lg border border-white/10 text-xs font-mono text-gray-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Schedule Another Consultation
          </button>
        </div>
      )}

      <style>{`
        @keyframes flowScanner {
          0%, 100% { left: -100%; right: 100%; }
          50% { left: 100%; right: -100%; }
        }
      `}</style>
    </div>
  );
}
