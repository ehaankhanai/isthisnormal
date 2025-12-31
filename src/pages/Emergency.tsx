import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  MessageCircle, 
  Users,
  ArrowLeft,
  ExternalLink
} from "lucide-react";

const wellnessTips = [
  {
    title: "Practice Deep Breathing",
    description: "Try the 4-7-8 technique: breathe in for 4 seconds, hold for 7, exhale for 8. This activates your body's relaxation response.",
  },
  {
    title: "Ground Yourself",
    description: "Use the 5-4-3-2-1 method: notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
  },
  {
    title: "Move Your Body",
    description: "Even a short 10-minute walk can boost your mood by releasing endorphins and reducing stress hormones.",
  },
  {
    title: "Stay Hydrated",
    description: "Dehydration can worsen anxiety and fatigue. Aim for 8 glasses of water daily to support your mental clarity.",
  },
  {
    title: "Connect with Someone",
    description: "Reach out to a friend, family member, or colleague. Social connection is one of the most powerful ways to improve your mood.",
  },
  {
    title: "Limit Screen Time Before Bed",
    description: "Blue light disrupts sleep. Try to avoid screens 1 hour before bedtime for better rest and mental health.",
  },
];

export default function Emergency() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 gradient-hero">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            {/* Back button */}
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            {/* Main message */}
            <Card className="mb-8 shadow-medium border-l-4 border-l-primary animate-fade-in">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    We're here for you
                  </h1>
                </div>

                <p className="text-lg text-foreground leading-relaxed mb-4">
                  It sounds like you might be going through a really difficult time. 
                  That's okay — and reaching out is a brave first step.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  While this tool can't provide the support you need right now, 
                  there are people who can help. Please consider reaching out to 
                  one of the resources below.
                </p>
              </CardContent>
            </Card>

            {/* Wellness Tips */}
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Helpful Wellness Tips
            </h2>

            <div className="space-y-4 mb-8">
              {wellnessTips.map((tip, index) => (
                <Card 
                  key={tip.title} 
                  className="shadow-card hover:shadow-medium transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-5">
                    <h3 className="font-display font-bold text-foreground mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional resources */}
            <Card className="mb-8 shadow-card animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Other ways to get support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Talk to someone you trust</p>
                    <p className="text-sm text-muted-foreground">
                      A friend, family member, teacher, or colleague who can listen
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Visit a local clinic</p>
                    <p className="text-sm text-muted-foreground">
                      Your local hospital or health center can connect you with support
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Encouragement */}
            <div className="text-center p-6 rounded-2xl bg-primary-light animate-fade-in-up" style={{ animationDelay: "500ms" }}>
              <p className="text-primary font-medium">
                Remember: Asking for help is a sign of strength, not weakness. 
                You matter, and things can get better with the right support.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
