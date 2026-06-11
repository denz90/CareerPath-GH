"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getProgramme, getProgrammeUniversities } from '@/services/api';
import { ArrowLeft, BookOpen, Briefcase, ChevronRight, School, Tag } from 'lucide-react';

export default function ProgrammeDetailsPage({ params }) {
  // Unwrap the params promise (Next.js 15+)
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [programme, setProgramme] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const progData = await getProgramme(id);
        const uniData = await getProgrammeUniversities(id);
        
        setProgramme(progData);
        setUniversities(uniData);
      } catch (err) {
        console.error(err);
        setError("Failed to load programme details.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-primary flex flex-col items-center">
          <BookOpen className="h-12 w-12 mb-4" />
          <p className="text-xl font-medium">Loading Details...</p>
        </div>
      </div>
    );
  }

  if (error || !programme) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-2xl max-w-md text-center border-red-500/20">
          <p className="text-red-500 mb-6">{error || "Programme not found."}</p>
          <Link href="/programmes" className="inline-flex bg-primary text-white px-6 py-3 rounded-full font-medium">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        
        {/* Back button */}
        <Link href="/programmes" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Programmes
        </Link>
        
        {/* Header */}
        <div className="glass-card rounded-3xl p-8 md:p-12 mb-12 animate-slide-up relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-bl-full -mr-32 -mt-32"></div>
          
          <div className="flex flex-wrap gap-3 mb-6 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
              {programme.degree_type}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider">
              {programme.field_category}
            </span>
            <span className="px-3 py-1 rounded-full bg-muted text-foreground text-xs font-bold uppercase tracking-wider">
              {programme.duration_years} Years
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 relative z-10">
            {programme.name}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed relative z-10 max-w-3xl">
            {programme.description}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Career Outcomes */}
          <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center mb-6">
              <Briefcase className="w-6 h-6 text-accent mr-3" />
              <h2 className="text-2xl font-bold">Career Outcomes</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {programme.career_outcomes || "Graduates can pursue various roles relevant to the industry."}
            </p>
          </div>

          {/* Academic Info */}
          <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-secondary mr-3" />
              <h2 className="text-2xl font-bold">Academic Background</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p><strong className="text-foreground">Required SHS Track:</strong> <br/> {programme.shs_background || "Any relevant track"}</p>
              <p><strong className="text-foreground">Typical Core Subjects:</strong> <br/> {programme.core_subjects || "Standard Core Subjects"}</p>
              <p><strong className="text-foreground">Elective Subjects:</strong> <br/> {programme.elective_subjects || "Relevant electives"}</p>
            </div>
          </div>
        </div>

        {/* Universities List */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center mb-8">
            <School className="w-8 h-8 text-primary mr-4" />
            <h2 className="text-3xl font-bold">Where to Study</h2>
          </div>
          
          {universities.length === 0 ? (
            <div className="glass-card p-8 rounded-2xl text-center text-muted-foreground">
              We currently don&apos;t have records of universities offering this exact programme in our database.
            </div>
          ) : (
            <div className="space-y-4">
              {universities.map(uniProg => (
                <div key={uniProg.id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/30 transition-colors">
                  
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        uniProg.university.type === 'public' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        uniProg.university.type === 'technical' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {uniProg.university.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {uniProg.campus || "Main Campus"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{uniProg.university.name}</h3>
                    <p className="text-sm text-muted-foreground">{uniProg.university.location_city}, {uniProg.university.region}</p>
                  </div>
                  
                  <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center shrink-0 border-t md:border-t-0 border-border pt-4 md:pt-0">
                    <div className="text-center sm:text-right px-4">
                      <div className="text-sm text-muted-foreground mb-1">WASSCE Cutoff</div>
                      <div className="text-2xl font-black text-primary">
                        {uniProg.wassce_cutoff ? uniProg.wassce_cutoff : "N/A"}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/universities/${uniProg.university.id}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-muted hover:bg-secondary hover:text-white rounded-lg font-medium transition-colors"
                    >
                      View University
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
