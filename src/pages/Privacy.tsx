import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Lock, 
  Eye, 
  Trash2, 
  Server,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

const privacyPoints = [
  {
    icon: Lock,
    title: "No Login Required",
    description: "Use the app completely anonymously. We don't require email, phone, or any personal information to get started.",
  },
  {
    icon: Eye,
    title: "No Tracking or Cookies",
    description: "We don't use tracking cookies, analytics trackers, or any technology that follows you around the web.",
  },
  {
    icon: Trash2,
    title: "No Data Stored by Default",
    description: "Your questions and our responses are not saved by default. Once you close the page, they're gone.",
  },
  {
    icon: Server,
    title: "No Data Selling",
    description: "We will never sell, share, or monetize your health questions or any personal information. Period.",
  },
];

const optionalFeatures = [
  "Save your symptom history for personal reference",
  "Get follow-up reminders about symptoms you've tracked",
  "Access your previous questions and responses",
  "Receive personalized health tips based on your history",
];

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 bg-muted/20">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Your Privacy Matters
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We built this app with privacy as the foundation, not an afterthought. 
                Here's exactly how we protect you.
              </p>
            </div>

            {/* Privacy points */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {privacyPoints.map((point, index) => (
                <Card 
                  key={point.title} 
                  className="shadow-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                      <point.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Optional login section */}
            <Card className="mb-12 shadow-medium animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Optional Account Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you <em>choose</em> to create an account (completely optional), you'll unlock these features:
                </p>
                <ul className="space-y-3">
                  {optionalFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Even with an account, you can delete all your data at any time with one click.
                </p>
              </CardContent>
            </Card>

            {/* Data handling */}
            <Card className="mb-12 shadow-card animate-fade-in-up" style={{ animationDelay: "500ms" }}>
              <CardHeader>
                <CardTitle>How We Handle Your Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground">
                <p>
                  <strong>Anonymous Usage:</strong> When you use the app without logging in, 
                  your questions are processed in real-time and immediately discarded. We don't 
                  store your IP address, browser information, or any identifiable data.
                </p>
                <p>
                  <strong>With an Account:</strong> If you create an account, your data is 
                  encrypted at rest using industry-standard AES-256 encryption. You have full 
                  control to view, export, or delete your data at any time.
                </p>
                <p>
                  <strong>AI Processing:</strong> Your questions are processed by AI models to 
                  generate responses. This processing happens in secure, encrypted environments, 
                  and the content is not used to train AI models or shared with third parties.
                </p>
              </CardContent>
            </Card>

            {/* Age requirement */}
            <Card className="shadow-card bg-muted/50 border-muted animate-fade-in-up" style={{ animationDelay: "600ms" }}>
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground mb-2">
                  Age Requirement
                </h3>
                <p className="text-muted-foreground">
                  This service is intended for users 13 years of age and older. By using this 
                  app, you confirm that you meet this age requirement. If you're under 18, we 
                  encourage you to discuss any health concerns with a trusted adult.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
