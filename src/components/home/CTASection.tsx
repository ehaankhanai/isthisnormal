import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-6">
            <Heart className="h-8 w-8 text-primary" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to put your mind at ease?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join thousands of people who found reassurance and clarity. 
            Your question is valid, and we're here to help — anonymously.
          </p>

          <Link to="/check">
            <Button variant="calm" size="xl" className="group">
              <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
              Ask Your Question Now
            </Button>
          </Link>

          <p className="mt-6 text-sm text-muted-foreground">
            No signup • No tracking • Completely free
          </p>
        </div>
      </div>
    </section>
  );
}
