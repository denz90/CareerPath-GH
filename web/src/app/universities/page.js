"use client";

import { useEffect, useState } from 'react';
import { getUniversities } from '@/services/api';
import { School, MapPin, ExternalLink, GraduationCap } from 'lucide-react';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchUnis() {
      try {
        const data = await getUniversities();
        setUniversities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUnis();
  }, []);

  const filteredUniversities = filter 
    ? universities.filter(u => u.type.toLowerCase() === filter.toLowerCase())
    : universities;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-slow text-primary flex flex-col items-center">
          <School className="h-12 w-12 mb-4" />
          <p className="text-xl font-medium">Loading Institutions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-slide-up">
          <div>
            <h1 className="text-4xl font-extrabold text-foreground mb-4">Explore Institutions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover public, private, and technical universities across Ghana. Find the right environment for your academic journey.
            </p>
          </div>
          
          <div className="flex bg-card border border-border rounded-xl p-1 shrink-0">
            <button 
              onClick={() => setFilter('')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === '' ? 'bg-primary text-white shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('public')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'public' ? 'bg-primary text-white shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}
            >
              Public
            </button>
            <button 
              onClick={() => setFilter('technical')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'technical' ? 'bg-primary text-white shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}
            >
              Technical
            </button>
            <button 
              onClick={() => setFilter('private')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'private' ? 'bg-primary text-white shadow-sm' : 'hover:bg-muted text-muted-foreground'}`}
            >
              Private
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((uni, idx) => (
            <div 
              key={uni.id} 
              className="glass-card rounded-2xl p-6 flex flex-col h-full animate-slide-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <School className="w-6 h-6 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  uni.type === 'public' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  uni.type === 'technical' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {uni.type}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-foreground mb-1 leading-tight">{uni.name}</h2>
              <p className="text-primary font-medium text-sm mb-4">{uni.short_name}</p>
              
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>{uni.location_city}, {uni.region}</span>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">
                {uni.description}
              </p>
              
              {uni.website && (
                <a 
                  href={uni.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors mt-auto"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              )}
            </div>
          ))}
        </div>
        
        {filteredUniversities.length === 0 && !loading && (
          <div className="text-center py-20 text-muted-foreground">
            No institutions found matching this filter.
          </div>
        )}

      </div>
    </div>
  );
}
