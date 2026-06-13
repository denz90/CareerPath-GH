"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  BrainCircuit, 
  School, 
  LineChart, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  Code, 
  HeartHandshake, 
  Coins, 
  Paintbrush, 
  BookOpen 
} from 'lucide-react';

// Sample quiz questions for the preview widget
const PREVIEW_QUESTIONS = [
  {
    id: 1,
    question: "Do you enjoy designing websites, writing computer code, or resolving technical hardware issues?",
    category: "Investigative",
    icon: Code,
    color: "text-blue-500 bg-blue-500/10"
  },
  {
    id: 2,
    question: "Do you like teaching, caring for others, or working on community development projects?",
    category: "Social",
    icon: HeartHandshake,
    color: "text-rose-500 bg-rose-500/10"
  },
  {
    id: 3,
    question: "Do you enjoy managing budgets, pitch-decks, leading projects, or building startup business ideas?",
    category: "Enterprising",
    icon: Coins,
    color: "text-amber-500 bg-amber-500/10"
  }
];

const CAREER_DOMAINS = [
  {
    id: "tech",
    name: "Engineering & Tech",
    icon: Code,
    desc: "Create, build, and optimize systems, software, and structures.",
    programmes: [
      { name: "BSc Computer Engineering", cutoff: "WASSCE Aggregate 8 - 14", career: "Software Engineer, Cloud Architect", schools: "KNUST, UG, UMaT" },
      { name: "BSc Electrical Engineering", cutoff: "WASSCE Aggregate 7 - 12", career: "Power Systems Engineer, Robotics Analyst", schools: "KNUST, Ashesi" },
      { name: "BSc Information Technology", cutoff: "WASSCE Aggregate 10 - 16", career: "System Administrator, Cyber Analyst", schools: "UG, KNUST, UPSA" }
    ]
  },
  {
    id: "health",
    name: "Health Sciences",
    icon: HeartHandshake,
    desc: "Diagnose, treat, and improve the lives of patients and communities.",
    programmes: [
      { name: "Doctor of Medicine (MBChB)", cutoff: "WASSCE Aggregate 6 - 8", career: "Medical Officer, Surgeon, Researcher", schools: "UG, KNUST, UDS, UCC" },
      { name: "BSc Pharmacy", cutoff: "WASSCE Aggregate 6 - 9", career: "Pharmacist, Clinical Trials Consultant", schools: "KNUST, UG" },
      { name: "BSc Nursing (General)", cutoff: "WASSCE Aggregate 8 - 14", career: "Registered Nurse, Healthcare Manager", schools: "UG, KNUST, UCC, UHAS" }
    ]
  },
  {
    id: "business",
    name: "Business & Finance",
    icon: Coins,
    desc: "Manage organizations, analyze financial trends, and drive economics.",
    programmes: [
      { name: "BSc Business Administration (Accounting)", cutoff: "WASSCE Aggregate 8 - 14", career: "Chartered Accountant, Financial Analyst", schools: "UG, UPSA, KNUST, UCC" },
      { name: "BSc Actuarial Science", cutoff: "WASSCE Aggregate 10 - 15", career: "Risk Specialist, Insurance Actuary", schools: "KNUST, UG, UCC" },
      { name: "BSc Applied Economics", cutoff: "WASSCE Aggregate 12 - 18", career: "Economic Policy Advisor, Business Analyst", schools: "UCC, UG, UDS" }
    ]
  },
  {
    id: "arts",
    name: "Creative Arts & Design",
    icon: Paintbrush,
    desc: "Communicate stories, design visuals, and construct creative products.",
    programmes: [
      { name: "BFA Fine Art / Graphic Design", cutoff: "WASSCE Aggregate 14 - 22", career: "Creative Director, UI/UX Architect", schools: "KNUST, UEW" },
      { name: "BSc Architecture", cutoff: "WASSCE Aggregate 7 - 11", career: "Licensed Architecture, Urban Planner", schools: "KNUST, Central University" },
      { name: "BA Communication Studies", cutoff: "WASSCE Aggregate 9 - 15", career: "PR Specialist, Journalist, Brand Lead", schools: "UG (GIJ), UCC" }
    ]
  }
];

const FAQS = [
  {
    q: "How does the RIASEC career assessment work?",
    a: "The RIASEC model categorizes individuals into six personality types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. Our questionnaire evaluates your preferences across these areas and recommends careers and university programmes that align with your dominant types."
  },
  {
    q: "Are the cutoff grades up-to-date?",
    a: "Yes, we continually track and update the entry requirements and cutoff aggregates for public and private Ghanaian universities based on the official admissions brochures published annually."
  },
  {
    q: "Can I use this app if I wrote SSSCE instead of WASSCE?",
    a: "Absolutely! The system handles both WASSCE and SSSCE grading scales. When entering your grades, you can select your certificate type and the matching cutoffs will adjust accordingly."
  },
  {
    q: "Is CareerPath GH free to use?",
    a: "Yes, 100% free. Our mission is to democratize career counseling and academic recommendation for every senior high school student in Ghana, regardless of their location or background."
  }
];

export default function Home() {
  // Mock Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0: intro, 1: q1, 2: q2, 3: q3, 4: result
  const [answers, setAnswers] = useState([]);
  const [matchedField, setMatchedField] = useState("");

  // Domain Tab State
  const [activeDomain, setActiveDomain] = useState("tech");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Handle preview answer selection
  const handleAnswer = (choice) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    
    if (quizStep < PREVIEW_QUESTIONS.length) {
      setQuizStep(quizStep + 1);
    }
  };

  // Calculate recommendation preview when answers are complete
  useEffect(() => {
    if (answers.length === 3) {
      // Logic for preview suggestion
      const yesIndices = answers.map((ans, idx) => (ans === "yes" ? idx : null)).filter(val => val !== null);
      if (yesIndices.includes(0)) {
        setMatchedField("Tech & Engineering");
      } else if (yesIndices.includes(1)) {
        setMatchedField("Healthcare & Life Sciences");
      } else if (yesIndices.includes(2)) {
        setMatchedField("Business Management & Administration");
      } else {
        setMatchedField("General Sciences or Liberal Arts");
      }
    }
  }, [answers]);

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setMatchedField("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[915px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0" style={{ height: '100%' }}>
            <img
              src="/hero-image.png"
              className="w-full object-cover"
              alt="Hero Background"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.50) 60%, rgba(0,0,0,0.35) 100%)' }}></div>
          </div>
        {/* Ambient background glow objects */}
        <div className="absolute top-10 right-10 -translate-y-12 translate-x-1/3 -z-10">
          <div className="w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px] animate-pulse-slow"></div>
        </div>
        <div className="absolute bottom-10 left-10 translate-y-1/3 -translate-x-1/3 -z-10">
          <div className="w-[500px] h-[500px] rounded-full bg-accent/10 blur-[130px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center animate-slide-up text-white">
              <div className="inline-flex items-center space-x-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white mb-6 max-w-fit backdrop-blur-md">
                <Sparkles size={14} className="text-white animate-spin" style={{ animationDuration: '3s' }} />
                <span>Smart Academic Counselor for Ghanaian Students</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
                Plan Your Future <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  With Full Confidence
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
                Take the guesswork out of tertiary admissions. Match your WASSCE/SSSCE grades and career personality to the ideal university programs in Ghana.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/assessment" 
                  className="inline-flex justify-center items-center rounded-2xl bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-4 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Start Career Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/programmes" 
                  className="inline-flex justify-center items-center rounded-2xl border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-base font-bold text-white shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Explore Programmes
                </Link>
              </div>

              {/* Dynamic Badges / Social Proof */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={18} className="text-green-400" />
                  <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.80)' }}>Updated 2026 Cutoffs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={18} className="text-green-400" />
                  <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.80)' }}>10+ Public & Private Unis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={18} className="text-green-400" />
                  <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.80)' }}>RIASEC-Powered Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Career Explorer Tabs */}
      <section className="py-24 bg-muted/30 border-y border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
              Explore Academic Domains
            </h2>
            <p className="text-lg text-muted-foreground">
              Select a field to view popular undergraduate programmes in Ghana, expected cutoff grades, and target institutions.
            </p>
          </div>

          {/* Desktop/Tablet tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CAREER_DOMAINS.map((domain) => {
              const IconComponent = domain.icon;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                    activeDomain === domain.id 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{domain.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left detail side */}
            <div className="lg:col-span-4 glass-card p-8 rounded-3xl border-primary/10">
              <span className="text-xs uppercase font-bold text-primary tracking-widest bg-primary/5 px-3 py-1 rounded-full">
                Overview
              </span>
              <h3 className="text-2xl font-bold mt-4 mb-3">
                {CAREER_DOMAINS.find(d => d.id === activeDomain).name}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {CAREER_DOMAINS.find(d => d.id === activeDomain).desc}
              </p>
              
              <Link 
                href="/programmes" 
                className="inline-flex items-center text-sm font-extrabold text-primary hover:text-primary/80 group"
              >
                <span>View all in this category</span>
                <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right programmes list side */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAREER_DOMAINS.find(d => d.id === activeDomain).programmes.map((prog, idx) => (
                <div 
                  key={idx} 
                  className="glass-card p-6 rounded-3xl border border-border/80 bg-card/60 flex flex-col justify-between min-h-[200px]"
                >
                  <div>
                    <h4 className="text-base font-bold text-foreground mb-2">{prog.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      Expected Roles: {prog.career}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/60 mt-auto">
                    <div className="flex justify-between items-center text-[11px] mb-1">
                      <span className="text-muted-foreground font-semibold">Requirement</span>
                      <span className="font-extrabold text-primary">{prog.cutoff}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-muted-foreground font-semibold">Top Institutions</span>
                      <span className="font-bold text-foreground truncate max-w-[140px]">{prog.schools}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Visual Timeline / How it Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
              Your Guidance Lifecycle
            </h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive system mapping out your path from high school to the lecture hall.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Process 1 */}
            <div className="glass-card rounded-3xl p-8 border border-border/80 hover:border-primary/20 relative group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Personality Test</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Complete our RIASEC career interest questionnaire designed to profile your core strengths and work preferences.
              </p>
            </div>

            {/* Process 2 */}
            <div className="glass-card rounded-3xl p-8 border border-border/80 hover:border-secondary/20 relative group">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Grade Input</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Add your exact WASSCE core and elective grades. Our algorithms process raw aggregates against current cutoffs.
              </p>
            </div>

            {/* Process 3 */}
            <div className="glass-card rounded-3xl p-8 border border-border/80 hover:border-accent/20 relative group">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">AI Matching</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get a matching report of the specific degree programs you qualify for across multiple universities.
              </p>
            </div>

            {/* Process 4 */}
            <div className="glass-card rounded-3xl p-8 border border-border/80 hover:border-green-500/20 relative group">
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mb-6 font-bold text-lg">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">Application Guide</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follow our institution-specific roadmap, including portal links and deadlines, to apply successfully.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Stats/Info Section */}
      <section className="py-24 bg-muted/30 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl overflow-hidden shadow-xl border-primary/15 bg-card/50">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left text grid */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Why we built this</span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
                  Combatting Program Mismatch in Ghana
                </h2>
                <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                  Roughly 35% of undergraduate students in Ghanaian tertiary institutions change fields or regret their initial degree programs. Early career mismatch drains family finances, extends graduation timelines, and impacts post-grad job rates.
                </p>
                <ul className="space-y-4 text-sm font-medium">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    <span>Tailored specifically for Ghanaian secondary education systems.</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    <span>Database dynamically pulls from official annual university brochures.</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    <span>Completely free counseling for high school graduates.</span>
                  </li>
                </ul>
              </div>

              {/* Right stats counters */}
              <div className="bg-muted/40 p-12 lg:p-16 flex items-center justify-center relative overflow-hidden border-l border-border/60">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
                <div className="relative z-10 grid grid-cols-2 gap-6 w-full max-w-md">
                  
                  <div className="glass-card p-6 rounded-3xl text-center bg-card">
                    <School className="w-8 h-8 mx-auto text-primary mb-3" />
                    <div className="text-3xl font-extrabold text-foreground">10+</div>
                    <div className="text-xs font-semibold text-muted-foreground mt-1">Institutions Catalogued</div>
                  </div>

                  <div className="glass-card p-6 rounded-3xl text-center bg-card">
                    <GraduationCap className="w-8 h-8 mx-auto text-secondary mb-3" />
                    <div className="text-3xl font-extrabold text-foreground">60+</div>
                    <div className="text-xs font-semibold text-muted-foreground mt-1">Undergrad Programmes</div>
                  </div>

                  <div className="glass-card p-6 rounded-3xl text-center bg-card col-span-2">
                    <MapPin className="w-8 h-8 mx-auto text-accent mb-3" />
                    <div className="text-3xl font-extrabold text-foreground">All 16 Regions</div>
                    <div className="text-xs font-semibold text-muted-foreground mt-1">Accessible Nationwide</div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Student Success Stories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from first-year students who optimized their university application decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Story 1 */}
            <div className="glass-card p-8 rounded-3xl border border-border/60 bg-card/65 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm italic text-muted-foreground leading-relaxed mb-6">
                  "I wanted to study Computer Science, but my WASSCE results aggregate was 13. I wasn't sure if KNUST or UG would accept me. CareerPath GH suggested BSc Information Technology at UPSA and KNUST. I applied and got into KNUST's IT programme! It saved me from wasting admission forms."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                  DK
                </div>
                <div>
                  <h4 className="text-sm font-bold">Daniel K. Osei</h4>
                  <p className="text-[10px] text-muted-foreground">First Year, KNUST IT</p>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="glass-card p-8 rounded-3xl border border-border/60 bg-card/65 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm italic text-muted-foreground leading-relaxed mb-6">
                  "I was torn between Business Administration and Law. The RIASEC assessment classified me as 'Conventional-Enterprising' and recommended Finance/Accounting. Today, I'm at UCC studying Commerce, and I know I'm exactly where I belong."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center font-bold text-sm">
                  HA
                </div>
                <div>
                  <h4 className="text-sm font-bold">Harriet A. Mensah</h4>
                  <p className="text-[10px] text-muted-foreground">First Year, UCC Commerce</p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="glass-card p-8 rounded-3xl border border-border/60 bg-card/65 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm italic text-muted-foreground leading-relaxed mb-6">
                  "The application timelines page was my savior. Knowing KNUST closed their form sales earlier than Legon allowed me to organize my vouchers and submit everything with days to spare. Every high schooler should bookmark this site."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold text-sm">
                  ET
                </div>
                <div>
                  <h4 className="text-sm font-bold">Emmanuel Tetteh</h4>
                  <p className="text-[10px] text-muted-foreground">First Year, UG Business School</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="py-24 bg-muted/30 border-t border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground">
              Have questions about how we process data and calculate suggestions?
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className="glass-card rounded-2xl border border-border/60 overflow-hidden bg-card/60 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-base hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180 text-primary' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    openFaq === index ? 'max-h-[300px] border-t border-border/60' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-sm text-muted-foreground leading-relaxed bg-muted/10">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Call To Action (CTA) Immersive Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        
        {/* Soft glowing ambient lighting behind the CTA */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-[600px] h-[300px] rounded-full bg-primary/20 blur-[130px] opacity-75"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="glass-card rounded-[2.5rem] p-12 md:p-16 border border-primary/20 text-center relative overflow-hidden bg-gradient-to-tr from-card/80 via-card/90 to-primary/5 shadow-2xl">
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Ready to Discover <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Your Academic Direction?
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Take the free 10-minute questionnaire, register your grades, and find your matches for KNUST, UG Legon, UCC, and more.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/assessment" 
                className="inline-flex justify-center items-center rounded-2xl bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-4 text-base font-bold shadow-lg shadow-primary/25 transition-all duration-200"
              >
                Start Free Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/login?mode=signup" 
                className="inline-flex justify-center items-center rounded-2xl bg-card border border-border hover:bg-muted/60 px-8 py-4 text-base font-bold text-foreground transition-all duration-200"
              >
                Create Account
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
