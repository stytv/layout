"use client"; // client-side component

import {
  Home,
  MessageSquare,
  Package,
  Settings,
  BarChart3,
  Bell,
  User,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { icon: Home, label: "Overview", path: "/" },
  { icon: MessageSquare, label: "Chats", path: "/chats" },
  { icon: Package, label: "Packages", path: "/packages" },
  { icon: Settings, label: "AI Settings", path: "/settings" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname(); // Next.js routing
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: isMobile && !isOpen ? -280 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-64 glass-card border-r z-50 flex flex-col"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg glow-text">TravelBot AI</h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
                  Connected
                </div>
              </div>
            </div>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                      isActive
                        ? "gradient-primary text-white shadow-glow"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Notifications</span>
            <span className="ml-auto w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300">
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};
