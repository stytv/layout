"use client";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase-client";

export type Message = {
  id: number;
  from: string;
  to: string;
  message: string;
  reply: string;
  created_at: string;
};

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const { data } = await supabaseClient
      .from<Message>("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  useEffect(() => {
    fetchMessages();

    // create a realtime channel
    const channel = supabaseClient
      .channel("messages_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return messages;
};
