"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

const GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];
const CORE_SUBJECTS = ['English Language', 'Mathematics (Core)', 'Integrated Science', 'Social Studies'];

export default function WassceInputPage() {
  const router = useRouter();
  
  const [coreGrades, setCoreGrades] = useState({
    'English Language': '',
    'Mathematics (Core)': '',
    'Integrated Science': '',
    'Social Studies': ''
  });
  
  const [electives, setElectives] = useState([
    { name: '', grade: '' },
    { name: '', grade: '' },
    { name: '', grade: '' },
    { name: '', grade: '' } // 4th elective is optional but common
  ]);

  const handleCoreChange = (subject, grade) => {
    setCoreGrades(prev => ({ ...prev, [subject]: grade }));
  };

  const handleElectiveChange = (index, field, value) => {
    const newElectives = [...electives];
    newElectives[index][field] = value;
    setElectives(newElectives);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty electives
    const validElectives = electives.filter(e => e.name.trim() !== '' && e.grade !== '');
    
    const electiveGradesObj = {};
    validElectives.forEach(e => {
      electiveGradesObj[e.name] = e.grade;
    });

    // Save to localStorage
    localStorage.setItem('careerPath_coreGrades', JSON.stringify(coreGrades));
    localStorage.setItem('careerPath_electiveGrades', JSON.stringify(electiveGradesObj));
    
    // Navigate to recommendations
    router.push('/recommendations');
  };

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto animate-fade-in">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Enter Your WASSCE Results</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please enter your grades for your core and elective subjects. This allows our recommendation engine to match you with programmes you are eligible for based on university cut-off points.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Core Subjects */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center mb-6 border-b border-border pb-4">
              <BookOpen className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-xl font-bold">Core Subjects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CORE_SUBJECTS.map(subject => (
                <div key={subject} className="flex flex-col">
                  <label className="text-sm font-medium mb-2 text-foreground">{subject} <span className="text-red-500">*</span></label>
                  <select 
                    required
                    value={coreGrades[subject]}
                    onChange={(e) => handleCoreChange(subject, e.target.value)}
                    className="p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  >
                    <option value="" disabled>Select Grade</option>
                    {GRADES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Elective Subjects */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center mb-6 border-b border-border pb-4">
              <GraduationCap className="h-6 w-6 text-secondary mr-3" />
              <h2 className="text-xl font-bold">Elective Subjects</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Enter at least 3 elective subjects and their corresponding grades.</p>
            
            <div className="space-y-4">
              {electives.map((elective, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Elective Subject {index + 1} {index < 3 && <span className="text-red-500">*</span>}
                    </label>
                    <input 
                      type="text" 
                      required={index < 3}
                      placeholder="e.g. Physics, Economics, Graphic Design"
                      value={elective.name}
                      onChange={(e) => handleElectiveChange(index, 'name', e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">Grade</label>
                    <select 
                      required={index < 3 || elective.name.trim() !== ''}
                      value={elective.grade}
                      onChange={(e) => handleElectiveChange(index, 'grade', e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                    >
                      <option value="" disabled>Grade</option>
                      {GRADES.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Get Recommendations
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
