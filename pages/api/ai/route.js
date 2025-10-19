import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function POST(req) {
  const { userMsg, userPhone } = await req.json();

  // 1. Generate AI reply via Groq
  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mixtral-8x7b",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful travel assistant from Hayat Travels. Answer travel-related queries, flight details, packages, visa help, and Umrah packages in a polite tone.",
        },
        { role: "user", content: userMsg },
      ],
    }),
  });

  const data = await groqResponse.json();
  const reply = data.choices[0].message.content;

  // 2. Save to Supabase
  await supabase.from("messages").insert({
    user_phone: userPhone,
    message: userMsg,
    reply,
  });

  // 3. Send reply back to WhatsApp user
  await fetch(`https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: userPhone,
      type: "text",
      text: { body: reply },
    }),
  });

  return NextResponse.json({ success: true, reply });
}
