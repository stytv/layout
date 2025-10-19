import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Package, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { icon: MessageSquare, label: "Total Messages", value: "12,543", change: "+12.5%" },
  { icon: Users, label: "Active Users", value: "3,421", change: "+8.2%" },
  { icon: Package, label: "Packages Inquired", value: "856", change: "+23.4%" },
  { icon: CheckCircle, label: "Bookings Made", value: "234", change: "+15.7%" },
];

const chartData = [
  { name: "Mon", messages: 400, engagement: 240 },
  { name: "Tue", messages: 300, engagement: 139 },
  { name: "Wed", messages: 600, engagement: 380 },
  { name: "Thu", messages: 800, engagement: 430 },
  { name: "Fri", messages: 700, engagement: 480 },
  { name: "Sat", messages: 900, engagement: 520 },
  { name: "Sun", messages: 850, engagement: 490 },
];

const recentActivity = [
  { user: "Sarah Johnson", message: "Inquired about Bali package", time: "2 min ago", avatar: "SJ" },
  { user: "Mike Chen", message: "Completed booking for Paris tour", time: "5 min ago", avatar: "MC" },
  { user: "Emma Wilson", message: "Asked about visa requirements", time: "8 min ago", avatar: "EW" },
  { user: "David Brown", message: "Requested custom itinerary", time: "12 min ago", avatar: "DB" },
];

const Overview = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back to your dashboard</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Message Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(174 100% 37.5%)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(174 100% 37.5%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="hsl(174 100% 37.5%)"
                    fillOpacity={1}
                    fill="url(#colorMessages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-semibold text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{activity.user}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Engagement Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="hsl(217 91% 60%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(217 91% 60%)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;
