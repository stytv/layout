"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Send, Edit } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  {
    id: 1,
    title: "Bali Paradise",
    destination: "Bali, Indonesia",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    description: "5 nights beachfront resort with guided tours",
  },
  {
    id: 2,
    title: "Paris Romance",
    destination: "Paris, France",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    description: "7 nights luxury experience with Seine cruise",
  },
  {
    id: 3,
    title: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    price: "$1,899",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    description: "6 nights cultural immersion with Mt. Fuji tour",
  },
  {
    id: 4,
    title: "Dubai Luxury",
    destination: "Dubai, UAE",
    price: "$3,299",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    description: "5 nights ultra-luxury with desert safari",
  },
  {
    id: 5,
    title: "Maldives Escape",
    destination: "Maldives",
    price: "$2,799",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    description: "7 nights overwater villa with spa treatments",
  },
  {
    id: 6,
    title: "New York Experience",
    destination: "New York, USA",
    price: "$1,599",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    description: "5 nights Manhattan hotel with Broadway show",
  },
];

const Packages = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Travel Packages</h2>
          <p className="text-sm md:text-base text-muted-foreground">Manage and create travel packages</p>
        </div>
        <Button className="gradient-primary text-white gap-2 w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          Add Package
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-0 overflow-hidden group hover:shadow-glow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl mb-1">{pkg.title}</h3>
                  <p className="text-sm text-white/80">{pkg.destination}</p>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                    {pkg.price}
                  </span>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button className="flex-1 gradient-primary text-white gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
