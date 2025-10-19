"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Save, Zap, MessageCircle, Brain } from "lucide-react";

const AISettings = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">AI Settings</h2>
        <p className="text-sm md:text-base text-muted-foreground">Configure your chatbot behavior and responses</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>Customize automated responses</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Greeting Message</Label>
              <Textarea
                placeholder="Enter greeting message..."
                className="glass-card border-0 min-h-[100px]"
                defaultValue="Hi there! 👋 Welcome to TravelBot AI. I'm here to help you plan your perfect vacation. What destination are you dreaming of?"
              />
            </div>
            <div className="space-y-2">
              <Label>Fallback Message</Label>
              <Textarea
                placeholder="Enter fallback message..."
                className="glass-card border-0 min-h-[100px]"
                defaultValue="I'm not sure I understand. Could you please rephrase your question? You can ask me about destinations, packages, pricing, or bookings."
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>AI Behavior</CardTitle>
                <CardDescription>Fine-tune the chatbot personality</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Response Tone</Label>
                  <p className="text-sm text-muted-foreground">Formal to Casual</p>
                </div>
                <span className="text-sm font-medium text-primary">70%</span>
              </div>
              <Slider defaultValue={[70]} max={100} step={1} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Automation Level</Label>
                  <p className="text-sm text-muted-foreground">How much AI handles automatically</p>
                </div>
                <span className="text-sm font-medium text-primary">85%</span>
              </div>
              <Slider defaultValue={[85]} max={100} step={1} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Response Speed</Label>
                  <p className="text-sm text-muted-foreground">Typing delay simulation</p>
                </div>
                <span className="text-sm font-medium text-primary">50%</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <CardTitle>Features</CardTitle>
                <CardDescription>Enable or disable AI features</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <Label>Smart Recommendations</Label>
                <p className="text-sm text-muted-foreground">Suggest packages based on conversation</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <Label>Multi-language Support</Label>
                <p className="text-sm text-muted-foreground">Auto-detect and respond in user's language</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <Label>Image Recognition</Label>
                <p className="text-sm text-muted-foreground">Analyze images sent by users</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <Label>Booking Integration</Label>
                <p className="text-sm text-muted-foreground">Allow direct bookings through chat</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card border-0 bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">AI Performance Stats</h3>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Accuracy: </span>
                    <span className="font-medium text-primary">94.2%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fallback Ratio: </span>
                    <span className="font-medium">5.8%</span>
                  </div>
                </div>
              </div>
              <Button className="gradient-primary text-white gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AISettings;
