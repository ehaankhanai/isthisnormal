import { MessageSquare, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "1",
    title: "Describe what you're feeling",
    description: "Type your symptom or question in your own words. No medical terms needed.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "Get personalized insight",
    description: "Our AI provides calm, clear information about what might be happening.",
  },
  {
    icon: CheckCircle,
    step: "3",
    title: "Know your next steps",
    description: "Understand when to relax, when to monitor, and when to seek help.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple. Private. Reassuring.
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div 
              key={item.step} 
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              <div className="relative inline-flex">
                <div className="w-20 h-20 rounded-2xl gradient-calm flex items-center justify-center shadow-glow mb-6">
                  <item.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center text-sm font-bold text-primary shadow-soft">
                  {item.step}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
