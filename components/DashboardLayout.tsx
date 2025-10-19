"use client"
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus, Menu } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-64">
        <header className="sticky top-0 z-40 border-b glass-card backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      <Button
        size="lg"
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 h-12 w-12 md:h-14 md:w-14 rounded-full gradient-primary text-white shadow-glow hover:scale-110 transition-transform duration-300 z-50"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
    </div>
  );
};
