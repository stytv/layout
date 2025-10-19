// app/pages/api/webhook/route.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "@/lib/supabase-server";
import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

type Data = {
  status: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("📩 Incoming request:", req.method, req.body);

  if (req.method !== "POST") {
    console.warn("⚠️ Method not allowed:", req.method);
    return res
      .status(405)
      .json({ status: "error", error: "Method not allowed" });
  }

  try {
    const { From: from, To: to, Body: message } = req.body;

    if (!from || !to || !message) {
      console.error("❌ Missing required fields in request body:", req.body);
      return res
        .status(400)
        .json({ status: "error", error: "Missing From, To, or Body" });
    }

    console.log("✅ Parsed incoming message:", { from, to, message });

    // --- Call Groq API ---
    console.log("🧠 Sending request to Groq API...");
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are ORIGIN — an intelligent travel assistant for ORIGIN TOURS AND TRAVELS based in Hyderabad, India.
                  You help customers plan Umrah, Hajj, and holiday packages.
                  Be professional, warm, and always provide relevant travel information including visa, flights, hotels, insurance, and transport.
                  Keep responses short, informative, and polite.`,
            },
            { role: "user", content: message },
          ],
          max_tokens: 150,
        }),
      }
    );

    console.log("🔍 Groq response status:", groqRes.status);
    const groqText = await groqRes.text(); // read raw text for debugging
    let groqData: any;
    try {
      groqData = JSON.parse(groqText);
    } catch {
      console.error("❌ Failed to parse Groq response:", groqText);
    }

    console.log("🧩 Full Groq response:", groqData || groqText);

    // --- Extract AI reply ---
    const aiReply =
      groqData?.choices?.[0]?.message?.content?.trim() ||
      groqData?.output_text?.trim() ||
      "Sorry, I didn't understand2.";

    console.log("💬 AI reply:", aiReply);

    // --- Send reply via Twilio ---
    console.log("📤 Sending WhatsApp message via Twilio...");
    const twilioResponse = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
      body: aiReply,
    });

    console.log("✅ Twilio message sent:", twilioResponse.sid);

    // --- Store in Supabase ---
    console.log("🗃️ Storing message in Supabase...");
    const { error: supabaseError } = await supabaseClient
      .from("messages")
      .insert([{ from, to, message, reply: aiReply }]);

    if (supabaseError) {
      console.error("❌ Supabase insert error:", supabaseError);
    } else {
      console.log("✅ Message stored successfully in Supabase.");
    }

    return res.status(200).json({ status: "ok" });
  } catch (error: any) {
    console.error("💥 ERROR in chatbot handler:", error);
    return res.status(500).json({ status: "error", error: error.message });
  }
}
