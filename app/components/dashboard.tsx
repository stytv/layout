"use client"
import React from "react";
import { useMessages, Message } from "@/hooks/useMessages";

const Dashboard: React.FC = () => {
  const messages: Message[] = useMessages();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">WhatsApp Chatbot Dashboard</h1>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border p-4 rounded-lg shadow-sm bg-black"
          >
            <p>
              <strong>From:</strong> {msg.from}
            </p>
            <p>
              <strong>To:</strong> {msg.to}
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
            <p>
              <strong>Reply:</strong> {msg.reply}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
