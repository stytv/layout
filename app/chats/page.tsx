"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Image } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

const conversations = [
  { id: 1, name: "Sarah Johnson", message: "Can you tell me more about Bali?", time: "2m", unread: 2, avatar: "SJ" },
  { id: 2, name: "Mike Chen", message: "Thanks for the booking!", time: "5m", unread: 0, avatar: "MC" },
  { id: 3, name: "Emma Wilson", message: "What about visa requirements?", time: "8m", unread: 1, avatar: "EW" },
  { id: 4, name: "David Brown", message: "I need a custom package", time: "12m", unread: 0, avatar: "DB" },
];

const messages = [
  { id: 1, sender: "user", text: "Hi! Can you tell me more about the Bali package?", time: "10:30 AM" },
  { id: 2, sender: "bot", text: "Hello! I'd be happy to help. Our Bali package includes 5 nights at a beachfront resort, daily breakfast, and guided tours to Ubud and Tanah Lot temple. Would you like more details?", time: "10:31 AM" },
  { id: 3, sender: "user", text: "Yes, what's the price?", time: "10:32 AM" },
  { id: 4, sender: "bot", text: "The package starts at $1,299 per person. This includes accommodation, breakfast, airport transfers, and all mentioned tours. Flights are not included. Would you like to proceed with booking?", time: "10:33 AM" },
];

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="h-[calc(100vh-4rem)] animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4"
        >
          <Card className="glass-card border-0 h-full flex flex-col">
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 glass-card border-0"
                />
              </div>
            </CardHeader>
            <ScrollArea className="flex-1">
              <CardContent className="space-y-2 pt-0">
                {conversations.map((conv, index) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedChat(conv)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      selectedChat.id === conv.id
                        ? "gradient-primary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm truncate">{conv.name}</span>
                          <span className={`text-xs ${selectedChat.id === conv.id ? "text-white/80" : "text-muted-foreground"}`}>
                            {conv.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className={`text-sm truncate ${selectedChat.id === conv.id ? "text-white/80" : "text-muted-foreground"}`}>
                            {conv.message}
                          </p>
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </ScrollArea>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8"
        >
          <Card className="glass-card border-0 h-full flex flex-col">
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full gradient-accent flex items-center justify-center text-white font-semibold text-sm">
                  {selectedChat.avatar}
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold">{selectedChat.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Active now
                  </div>
                </div>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.sender === "user"
                          ? "gradient-primary text-white"
                          : "glass-card"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            <CardContent className="border-t border-border pt-4">
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="glass-card hidden md:flex">
                  <Image className="w-5 h-5" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="glass-card border-0"
                />
                <Button className="gradient-primary text-white">
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Chats;
