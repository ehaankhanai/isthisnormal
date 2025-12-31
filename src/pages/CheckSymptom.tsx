import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Send, 
  Shield, 
  Clock, 
  MapPin, 
  User, 
  ChevronDown, 
  ChevronUp,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { analyzeSymptom, SymptomData } from "@/lib/api/symptoms";

const bodyAreas = [
  "Head/Face", "Neck", "Chest", "Stomach/Abdomen", 
  "Back", "Arms/Hands", "Legs/Feet", "Skin", "Hair/Scalp", "General/All over"
];

const durations = [
  "Just started today", "A few days", "About a week", 
  "2-4 weeks", "More than a month", "Comes and goes"
];

const ageRanges = [
  "Under 18", "18-25", "26-35", "36-45", "46-55", "55+"
];

// Crisis keywords that should trigger emergency redirect
const crisisKeywords = [
  "suicide", "kill myself", "end my life", "self-harm", 
  "hurt myself", "don't want to live", "want to die"
];

export default function CheckSymptom() {
  const [symptomText, setSymptomText] = useState("");
  const [showGuidedOptions, setShowGuidedOptions] = useState(false);
  const [selectedBodyArea, setSelectedBodyArea] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!symptomText.trim()) {
      toast({
        title: "Please describe your symptom",
        description: "Tell us what you're experiencing so we can help.",
        variant: "destructive",
      });
      return;
    }

    if (!hasConsented) {
      toast({
        title: "Please accept the disclaimer",
        description: "You must acknowledge the disclaimer before continuing.",
        variant: "destructive",
      });
      return;
    }

    // Check for crisis keywords
    const hasCrisisIndicator = crisisKeywords.some(keyword => 
      symptomText.toLowerCase().includes(keyword)
    );

    if (hasCrisisIndicator) {
      navigate("/emergency");
      return;
    }

    setIsSubmitting(true);

    const symptomData: SymptomData = {
      text: symptomText,
      bodyArea: selectedBodyArea || undefined,
      duration: selectedDuration || undefined,
      ageRange: selectedAge || undefined,
      timestamp: new Date().toISOString(),
    };

    try {
      const analysis = await analyzeSymptom(symptomData);
      navigate("/response", { 
        state: { 
          symptomData,
          analysis 
        } 
      });
    } catch (error) {
      console.error('Error analyzing symptom:', error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 gradient-hero">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                What are you wondering about?
              </h1>
              <p className="text-muted-foreground">
                Describe what you're experiencing in your own words. 
                There's no wrong way to ask.
              </p>
            </div>

            {/* Main input card */}
            <Card className="shadow-medium animate-fade-in-up mb-6">
              <CardContent className="p-6">
                <Textarea
                  placeholder="Example: I've noticed increased hair fall when I shower or brush my hair. It's been happening for about 2 weeks..."
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  className="min-h-[160px] text-base mb-4"
                />

                {/* Guided options toggle */}
                <button
                  type="button"
                  onClick={() => setShowGuidedOptions(!showGuidedOptions)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  {showGuidedOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  Add more details (optional)
                </button>

                {/* Guided options */}
                {showGuidedOptions && (
                  <div className="space-y-4 pt-4 border-t border-border/50 animate-fade-in">
                    {/* Body area */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Where in your body? (optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {bodyAreas.map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => setSelectedBodyArea(selectedBodyArea === area ? "" : area)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                              selectedBodyArea === area
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        How long? (optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {durations.map((duration) => (
                          <button
                            key={duration}
                            type="button"
                            onClick={() => setSelectedDuration(selectedDuration === duration ? "" : duration)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                              selectedDuration === duration
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            {duration}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age range */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <User className="h-4 w-4 text-primary" />
                        Age range (optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {ageRanges.map((age) => (
                          <button
                            key={age}
                            type="button"
                            onClick={() => setSelectedAge(selectedAge === age ? "" : age)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                              selectedAge === age
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Consent checkbox */}
            <Card className="shadow-card mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasConsented}
                    onChange={(e) => setHasConsented(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    I understand this tool provides <strong>general information only</strong> and 
                    does not diagnose, treat, or replace professional medical advice. I am 13 years 
                    or older and will seek proper medical care if needed.
                  </span>
                </label>
              </CardContent>
            </Card>

            {/* Submit button */}
            <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Button
                variant="calm"
                size="xl"
                onClick={handleSubmit}
                disabled={isSubmitting || !symptomText.trim() || !hasConsented}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing your question...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Get Insight
                  </>
                )}
              </Button>
            </div>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Shield className="h-4 w-4" />
              <span>Your question is anonymous and not stored</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
