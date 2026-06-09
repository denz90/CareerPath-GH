import "./globals.css";
import Link from 'next/link';

import UserMenu from './UserMenu';

export const metadata = {
  title: "CareerPath GH",
  description: "Intelligent Career Guidance and University Programme Recommendation for Ghanaian SHS Leavers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 w-full glass border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CareerPath GH
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link href="/" className="hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">Home</Link>
                  <Link href="/assessment" className="hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">Take Quiz</Link>
                  <Link href="/universities" className="hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">Universities</Link>
                  <Link href="/programmes" className="hover:text-primary transition-colors px-3 py-2 rounded-md font-medium">Programmes</Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <UserMenu />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CareerPath GH</span>
                <p className="text-muted-foreground mt-2 text-sm">Empowering Ghanaian SHS leavers to make informed decisions.</p>
              </div>
              <div className="flex space-x-6 text-sm font-medium text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">About</Link>
                <Link href="/universities" className="hover:text-primary transition-colors">Institutions</Link>
                <Link href="/programmes" className="hover:text-primary transition-colors">Programmes</Link>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} CareerPath GH. Final Year Project.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
