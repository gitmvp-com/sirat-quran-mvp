import { Link, useLocation } from "react-router-dom";
import { Book, Home, Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-br from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Sirat
            </span>
          </Link>
          <nav className="flex items-center gap-6 ml-auto">
            <Link
              to="/"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to="/quran"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.startsWith("/quran") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Book className="h-4 w-4" />
              Quran
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
          <p className="mt-2">Data from AlQuran.cloud API</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
