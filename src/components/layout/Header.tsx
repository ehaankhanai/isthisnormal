import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart } from "lucide-react";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/30">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Heart className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Is This Normal?
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link to="/privacy">
            <Button variant="ghost" size="sm" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </Button>
          </Link>
          {isHome ? (
            <Link to="/check">
              <Button variant="calm" size="sm">
                Start Checking
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button variant="soft" size="sm">
                Home
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
