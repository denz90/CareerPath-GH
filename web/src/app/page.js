import Link from 'next/link';
import { Compass, GraduationCap, MapPin, ArrowRight, BrainCircuit, School, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl opacity-50 animate-pulse-slow"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-[600px] h-[600px] rounded-full bg-secondary/20 blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 animate-slide-up">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Empowering Ghanaian SHS Leavers
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Find Your Perfect <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              University Programme
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto mb-12">
            Make informed decisions about your tertiary education. Match your WASSCE results and career interests to the best degree programmes in Ghana.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/assessment" className="inline-flex justify-center items-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-200">
              Take the Free Career Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/programmes" className="inline-flex justify-center items-center rounded-full bg-card border border-border px-8 py-4 text-lg font-semibold text-foreground shadow-sm hover:bg-muted hover:-translate-y-1 transition-all duration-200">
              Browse Programmes
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Journey to University</h2>
            <p className="mt-4 text-lg text-muted-foreground">Four simple steps to find where you belong.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Discover</h3>
              <p className="text-muted-foreground">Take our 20-question psychological assessment based on the RIASEC model to identify your career interests.</p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-xl flex items-center justify-center mb-6">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Match</h3>
              <p className="text-muted-foreground">Enter your WASSCE grades. Our AI engine cross-references your results with university requirements.</p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Explore</h3>
              <p className="text-muted-foreground">Review your personalized recommendations. See which universities offer the programmes you match with.</p>
            </div>

            {/* Step 4 */}
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">4. Apply</h3>
              <p className="text-muted-foreground">Follow our step-by-step application guide to apply confidently to your chosen Ghanaian universities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Info Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border-primary/20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Why CareerPath GH?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Over 35% of students change their programme within the first two years due to poor initial selection. Early career mismatch costs time, money, and motivation.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="ml-3 text-lg text-foreground">Tailored for the Ghanaian education system.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="ml-3 text-lg text-foreground">Data-driven recommendations based on actual historical cutoffs.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="ml-3 text-lg text-foreground">100% free and accessible to all SHS leavers.</p>
                  </li>
                </ul>
              </div>
              <div className="bg-muted p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"></div>
                <div className="relative z-10 grid grid-cols-2 gap-6 w-full">
                  <div className="glass-card p-6 rounded-2xl text-center">
                    <School className="w-10 h-10 mx-auto text-primary mb-3" />
                    <div className="text-4xl font-extrabold text-foreground">10+</div>
                    <div className="text-sm font-medium text-muted-foreground mt-1">Universities</div>
                  </div>
                  <div className="glass-card p-6 rounded-2xl text-center">
                    <GraduationCap className="w-10 h-10 mx-auto text-secondary mb-3" />
                    <div className="text-4xl font-extrabold text-foreground">60+</div>
                    <div className="text-sm font-medium text-muted-foreground mt-1">Programmes</div>
                  </div>
                  <div className="glass-card p-6 rounded-2xl text-center col-span-2">
                    <MapPin className="w-10 h-10 mx-auto text-accent mb-3" />
                    <div className="text-4xl font-extrabold text-foreground">All 16 Regions</div>
                    <div className="text-sm font-medium text-muted-foreground mt-1">Accessible Everywhere</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
