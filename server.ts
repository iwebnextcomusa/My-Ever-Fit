import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parsers
app.use(express.json());

// In-memory data store for bookings and contact messages
interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  goals: string;
  createdAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  goals: string;
  message: string;
  createdAt: string;
}

const bookings: Booking[] = [
  {
    id: "b1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "(562) 111-2222",
    service: "Personal Training",
    date: "2026-06-20",
    time: "10:00 AM",
    goals: "Build muscle and improve core strength",
    createdAt: new Date().toISOString(),
  }
];

const contacts: ContactSubmission[] = [];

// Gemini client initialization helper
let aiClient: GoogleGenAI | null = null;
function getGemini() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// REST API Endpoints

// Get all bookings
app.get("/api/bookings", (req, res) => {
  res.json({ bookings });
});

// Create a new booking
app.post("/api/bookings", (req, res) => {
  const { name, email, phone, service, date, time, goals } = req.body;
  if (!name || !email || !phone || !date || !time) {
    return res.status(400).json({ error: "Missing required fields for booking." });
  }

  const newBooking: Booking = {
    id: `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name,
    email,
    phone,
    service: service || "General Training Consultation",
    date,
    time,
    goals: goals || "",
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

// Send contact message
app.post("/api/contacts", (req, res) => {
  const { name, email, phone, goals, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const newSubmission: ContactSubmission = {
    id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name,
    email,
    phone: phone || "",
    goals: goals || "",
    message,
    createdAt: new Date().toISOString(),
  };

  contacts.push(newSubmission);
  res.status(201).json({ success: true, contact: newSubmission });
});

// Get contact messages
app.get("/api/contacts", (req, res) => {
  res.json({ contacts });
});

// AI Chatbot with Gemini
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body; // Array of { role: 'user' | 'model', text: string }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "A 'messages' array is required." });
  }

  const sysInstruction = `You are EverAI, the premium virtual coach and booking assistant for MyEverFit (website: myeverfit.us, phone: (562) 440-0707).
MyEverFit offers:
- Personal Training (1-on-1 private gym sessions focusing on form, metabolic rate, and customized progressive overload)
- Online Coaching (custom fitness plans, weekly check-ins via EverFit App, constant chat support)
- Weight Loss Programs (macro coaching, customized low-barrier metabolic workouts, and habit tracking)
- Strength & Conditioning (powerlifting, athletic performance, and functional mobility)
- Nutrition Guidance & Custom Fitness Plans (caloric structure, meal plans, body comp transformation)

Coaching Philosophy: Sustainable fitness through science-backed, high-efficacy custom programs. We build real wellness, no fad diets or short-cuts.
Your personality: Enthusiastic, motivating, friendly, knowledgeable, and professional. 

When answering questions:
- Keep answers under 120 words to ensure easy reading in a floating chat module.
- Always encourage visitors to book a Free Consultation using the Booking section on the page.
- Do not make up facts; if asked about specific pricing of custom packages, say that custom packages are custom tailored during the free consultation, but monthly basic packages starts around $149/mo.
- Reference the phone number (562) 440-0707 for fast booking if they prefer to talk directly.`;

  try {
    const ai = getGemini();
    if (!ai) {
      return res.json({
        text: "Hi there! I am EverAI, your MyEverFit assistant. Note: The GEMINI_API_KEY is currently not configured or pending in your environment. You can still reach us at (562) 440-0707 or book via the form on this page anytime! Training packages start at $149/mo."
      });
    }

    // Format messages for the @google/genai SDK
    // The SDK contents uses: contents: string | Content | Content[]
    // For contents, we can pass a structure of history, but a simple prompt is safest or standard formatting.
    // Let's format the contents array beautifully.
    // In gemini-api SKILL.md:
    // const response = await ai.models.generateContent({ model: "gemini-3.5-flash", contents: "..." })
    // If we want chat style, we can format user messages and previous assistant messages as standard parts:
    const contents = messages.map(m => {
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }]
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: sysInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "An error occurred while generating chatbot response.", details: err.message });
  }
});

// Vite Middleware integrated after API routes
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT} (Express+Vite)`);
  });
}

start();
