import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  index: number;
}

export const StatCard = ({ icon: Icon, label, value, change, index }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="glass-card border-0 overflow-hidden group hover:shadow-glow transition-all duration-300">
        <div className="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            {change && (
              <span className="text-sm font-medium text-primary">{change}</span>
            )}
          </div>
          <h3 className="text-3xl font-bold mb-1">{value}</h3>
          <p className="text-sm text-muted-foreground">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
