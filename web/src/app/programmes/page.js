"use client";

import { useEffect, useState } from 'react';
import { getProgrammes } from '@/services/api';
import { BookOpen, Briefcase, ChevronRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchProgs() {
      try {
        const data = await getProgrammes();
        setProgrammes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgs();
  }, []);

  const filteredProgrammes = programmes.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.field_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-secondary flex flex-col items-center">
          <GraduationCap className="h-12 w-12 mb-4" />
          <p className="text-xl font-medium">Loading Programmes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Undergraduate Programmes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Browse through diverse degree programmes offered across Ghanaian institutions. Find out entry requirements and career prospects.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search by programme name or field (e.g., Computer Science, Engineering)"
              className="block w-full pl-10 pr-3 py-4 border border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProgrammes.map((prog, idx) => (
            <div 
              key={prog.id} 
              className="glass-card rounded-2xl p-6 flex flex-col animate-slide-up"
              style={{ animationDelay: `${(idx % 10) * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider">
                  {prog.degree_type}
                </span>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {prog.duration_years} Years
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-foreground mb-2">{prog.name}</h2>
              <p className="text-sm font-medium text-accent mb-4">{prog.field_category}</p>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-grow">
                {prog.description}
              </p>
              
              <div className="flex items-start gap-2 text-xs text-muted-foreground mb-6">
                <Briefcase className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span className="line-clamp-1">{prog.career_outcomes || 'Various relevant industries'}</span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                <div className="flex gap-1">
                  {prog.riasec_tags?.split(',').map(tag => (
                    <span key={tag} className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground" title={`Holland Code: ${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/programmes/${prog.id}`} className="text-sm font-medium text-secondary hover:text-primary transition-colors flex items-center">
                  View Cutoffs <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProgrammes.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No programmes match your search.
          </div>
        )}

      </div>
    </div>
  );
}
