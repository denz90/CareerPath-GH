"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecommendations } from '@/services/api';
import { Sparkles, ArrowRight, ChevronRight, GraduationCap, MapPin, Building2, Briefcase } from 'lucide-react';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const riasecScores = JSON.parse(localStorage.getItem('careerPath_riasecScores') || '{}');
        const coreGrades = JSON.parse(localStorage.getItem('careerPath_coreGrades') || '{}');
        const electiveGrades = JSON.parse(localStorage.getItem('careerPath_electiveGrades') || '{}');

        // Check if data exists
        if (Object.keys(riasecScores).length === 0 || Object.keys(coreGrades).length === 0) {
          setError("We couldn't find your assessment data. Please complete the quiz and WASSCE input first.");
          setLoading(false);
          return;
        }

        const data = await getRecommendations(riasecScores, coreGrades, electiveGrades);
        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background min-h-[60vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-slow"></div>
          <Sparkles className="h-16 w-16 text-primary animate-pulse relative z-10" />
        </div>
        <h2 className="text-2xl font-bold mt-6 text-foreground">Calculating Your Best Matches...</h2>
        <p className="text-muted-foreground mt-2">Analyzing your WASSCE results and RIASEC profile</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-2xl max-w-md text-center border-red-500/20">
          <p className="text-red-500 mb-6">{error}</p>
          <Link href="/assessment" className="inline-flex bg-primary text-white px-6 py-3 rounded-full font-medium">
            Start Over
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Your Personalized Matches
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
            Top Programmes for You
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your WASSCE aggregate ({recommendations[0]?.student_aggregate || 'N/A'}) and your career interests.
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {recommendations.length === 0 ? (
            <div className="text-center p-12 glass-card rounded-2xl">
              <p className="text-xl text-muted-foreground">No strong matches found. Please review your WASSCE inputs or consider different career paths.</p>
            </div>
          ) : (
            recommendations.map((rec, index) => (
              <div 
                key={rec.programme.id} 
                className="glass-card rounded-2xl overflow-hidden animate-slide-up hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  
                  {/* Left Column: Programme Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        {rec.programme.degree_type}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {rec.programme.field_category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">{rec.programme.name}</h2>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                      {rec.programme.description}
                    </p>
                    
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                      <Briefcase className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <p><strong className="text-foreground">Career Paths:</strong> {rec.programme.career_outcomes || 'Various roles in the industry'}</p>
                    </div>
                  </div>
                  
                  {/* Right Column: Match Scores & Action */}
                  <div className="w-full md:w-64 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6">
                    <div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Overall Match</span>
                          <span className="font-bold text-primary">{Math.round(rec.scores.final_score * 100)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${rec.scores.final_score * 100}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Academic Eligibility</span>
                          <span className="font-medium text-secondary">{Math.round(rec.scores.eligibility_score * 100)}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Interest Alignment</span>
                          <span className="font-medium text-accent">{Math.round(rec.scores.interest_score * 100)}%</span>
                        </div>
                      </div>
                      
                      <div className="mb-6 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-foreground">Typical Cutoff:</span>
                          <span className="font-black text-primary text-lg">{rec.typical_cutoff}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/programmes/${rec.programme.id}`} 
                      className="w-full inline-flex items-center justify-center px-4 py-3 bg-muted hover:bg-primary hover:text-white rounded-xl font-medium transition-colors group"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
