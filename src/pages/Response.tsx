import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Users, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle,
  ClipboardList,
  Shield,
  MessageCircle,
  Share2,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SymptomAnalysis } from "@/lib/api/symptoms";

export default function Response() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const symptomData = location.state?.symptomData;
  const analysis: SymptomAnalysis | undefined = location.state?.analysis;

  useEffect(() => {
    if (!symptomData || !analysis) {
      navigate("/check");
    }
  }, [symptomData, analysis, navigate]);

  if (!symptomData || !analysis) return null;

  const handleShare = () => {
    const shareText = "I asked 'Is This Normal?' about something I was worried about and felt more at ease. Try it yourself — it's anonymous and reassuring.";
    
    if (navigator.share) {
      navigator.share({
        title: "Is This Normal?",
        text: shareText,
        url: window.location.origin,
      }).catch(() => {
        // User cancelled or error
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
      toast({
        title: "Copied to clipboard!",
        description: "Share this with anyone who might find it helpful.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 bg-muted/20">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <Link to="/check" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Ask another question
            </Link>

            {/* What they asked */}
            <Card className="mb-6 shadow-card bg-muted/50 animate-fade-in">
              <CardContent className="py-4">
                <p className="text-sm text-muted-foreground mb-1">You asked about:</p>
                <p className="text-foreground font-medium">"{symptomData.text}"</p>
                {(symptomData.bodyArea || symptomData.duration || symptomData.ageRange) && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {symptomData.bodyArea && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-light text-primary">
                        {symptomData.bodyArea}
                      </span>
                    )}
                    {symptomData.duration && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-light text-primary">
                        {symptomData.duration}
                      </span>
                    )}
                    {symptomData.ageRange && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-light text-primary">
                        {symptomData.ageRange}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 1: Emotional Acknowledgement */}
            <Card className="mb-6 shadow-medium animate-fade-in-up border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Heart className="h-5 w-5 text-primary" />
                  First, a moment of reassurance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {analysis.acknowledgement}
                </p>
              </CardContent>
            </Card>

            {/* Section 2: Is This Common? */}
            <Card className="mb-6 shadow-card animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="h-5 w-5 text-primary" />
                  Is this common?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed mb-4">
                  {analysis.commonality}
                </p>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-light">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {analysis.similarQuestions.toLocaleString()} people have asked similar questions
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Possible Explanations */}
            <Card className="mb-6 shadow-card animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  What could be happening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  These are common, non-diagnostic possibilities — not a diagnosis:
                </p>
                <ul className="space-y-2">
                  {analysis.possibleExplanations.map((explanation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-foreground">{explanation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Section 4: When it's OK vs When to Act */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-card animate-fade-in-up border-t-4 border-t-primary" style={{ animationDelay: "300ms" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Usually okay if...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.usuallyOkayIf.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-in-up border-t-4 border-t-amber-500" style={{ animationDelay: "350ms" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Consider seeking help if...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.seekHelpIf.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Section 5: Self-Care Steps */}
            <Card className="mb-6 shadow-card animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  What you can do now
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {analysis.selfCareSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Section 6: Disclaimer */}
            <Card className="mb-8 bg-muted/50 border-muted shadow-none animate-fade-in-up" style={{ animationDelay: "500ms" }}>
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Important:</strong> This tool provides general wellness information only and does not 
                    diagnose, treat, or replace professional medical advice. If you're concerned about your health, 
                    please consult a qualified healthcare provider.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
              <Link to="/check">
                <Button variant="calm" size="lg">
                  <MessageCircle className="h-5 w-5" />
                  Ask Another Question
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
                Share (Anonymized)
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
