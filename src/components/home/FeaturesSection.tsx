import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Zap, Users, Brain, Lock } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Truly Anonymous",
    description: "No login, no tracking, no cookies. Your questions stay completely private.",
  },
  {
    icon: Heart,
    title: "Judgment-Free Zone",
    description: "Ask anything without embarrassment. We've heard it all before — and it's usually normal.",
  },
  {
    icon: Brain,
    title: "Calm, Clear Answers",
    description: "Get reassuring explanations, not scary medical jargon or worst-case scenarios.",
  },
  {
    icon: Zap,
    title: "Instant Response",
    description: "No waiting rooms. Get helpful information in seconds, anytime you need it.",
  },
  {
    icon: Shield,
    title: "Safe Guidance",
    description: "Know when to relax and when it might be worth talking to a professional.",
  },
  {
    icon: Users,
    title: "You're Not Alone",
    description: "See that thousands of others have wondered the same things you have.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why people trust us
          </h2>
          <p className="text-lg text-muted-foreground">
            Built with privacy and emotional wellbeing at the core
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-medium hover:-translate-y-1 cursor-default animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
