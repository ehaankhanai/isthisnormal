import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Shield, Lock, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl" />

      <div className="container relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          {/* Main headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Wondering if what you're feeling is{" "}
            <span className="text-primary relative">
              normal
              <Sparkles className="absolute -top-2 -right-8 h-6 w-6 text-primary-glow animate-pulse-gentle" />
            </span>
            ?
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            You're not alone. Ask about any symptom you're curious or worried about — 
            get calm, reassuring guidance without judgment. We'll never diagnose, 
            just help you understand.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/check">
              <Button variant="calm" size="xl" className="group">
                <MessageCircle className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                Ask Anonymously
              </Button>
            </Link>
            <Link to="/privacy">
              <Button variant="outline" size="lg">
                <Shield className="h-5 w-5" />
                How We Protect You
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>No data stored by default</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.5s" }} />
              <span>Instant responses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
              <span>Completely free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
