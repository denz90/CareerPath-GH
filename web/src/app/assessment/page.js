"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, BrainCircuit, Check, X } from 'lucide-react';
import { getQuestions } from '@/services/api';

export default function AssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        setError('Failed to load assessment questions. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleAnswer = (riasecType, isYes) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: { type: riasecType, isYes }
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    // Calculate raw scores
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    // Add current answer since state might not have updated yet if they click the last button
    Object.values(answers).forEach(ans => {
      if (ans.isYes) {
        scores[ans.type] = (scores[ans.type] || 0) + 1;
      }
    });

    // Save to localStorage
    localStorage.setItem('careerPath_riasecScores', JSON.stringify(scores));
    
    // Navigate to next step
    router.push('/wassce-input');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse-slow text-primary flex flex-col items-center">
          <BrainCircuit className="h-12 w-12 mb-4" />
          <p className="text-xl font-medium">Loading Assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-2xl max-w-md text-center border-red-500/20">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-primary text-white px-4 py-2 rounded-md">Retry</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="flex-1 flex items-center justify-center">No questions found.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="flex-1 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="w-full max-w-3xl">
        
        {/* Header & Progress */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Career Interest Assessment</h1>
          <p className="text-muted-foreground mb-6">Answer honestly to get the best recommendations.</p>
          
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Completed</span>
          </div>
          <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -mr-32 -mt-32"></div>
          
          <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-12 text-center leading-relaxed relative z-10">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto relative z-10">
            <button 
              onClick={() => handleAnswer(currentQuestion.riasec_type, false)}
              className="flex items-center justify-center p-6 rounded-2xl border-2 border-border hover:border-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all group"
            >
              <X className="h-6 w-6 mr-3 text-red-500 opacity-50 group-hover:opacity-100" />
              <span className="text-lg font-medium">{currentQuestion.option_no || 'No, not for me'}</span>
            </button>
            <button 
              onClick={() => handleAnswer(currentQuestion.riasec_type, true)}
              className="flex items-center justify-center p-6 rounded-2xl border-2 border-primary hover:bg-primary/5 transition-all group shadow-sm hover:shadow-md"
            >
              <Check className="h-6 w-6 mr-3 text-primary" />
              <span className="text-lg font-medium">{currentQuestion.option_yes || 'Yes, I enjoy this'}</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>
          
          {currentQuestionIndex === questions.length - 1 && (
            <button 
              onClick={finishAssessment}
              className="flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Finish Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
