import { Link } from "react-router-dom";
import { Heart, Shield, AlertCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-muted/30 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold text-foreground">
              Is This Normal?
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Shield className="h-4 w-4" />
              Privacy Policy
            </Link>
            <Link to="/emergency" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <AlertCircle className="h-4 w-4" />
              Emergency Help
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/30">
          <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <strong>Important:</strong> This tool provides general wellness information only and does not 
            diagnose, treat, or replace professional medical advice. Always consult a qualified healthcare 
            provider for medical concerns. If you're experiencing a medical emergency, call emergency services immediately.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} Is This Normal? All rights reserved.
        </p>
      </div>
    </footer>
  );
}
