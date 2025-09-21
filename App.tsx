
import React, { useState } from 'react';
import type { FormData } from './types';
import { Goal, Experience, Equipment, Diet } from './types';
import { generatePlan } from './services/geminiService';
import { PlanGeneratorForm } from './components/PlanGeneratorForm';
import { PlanDisplay } from './components/PlanDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    goal: Goal.FAT_LOSS,
    experience: Experience.BEGINNER,
    equipment: Equipment.NO_EQUIPMENT,
    diet: Diet.NO_RESTRICTION,
    allergies: '',
  });

  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      setError("Please enter your name.");
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedPlan('');

    const plan = await generatePlan(formData);
    
    if (plan.startsWith('An error occurred')) {
      setError(plan);
    } else {
      setGeneratedPlan(plan);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              AI Fitness & Nutrition Coach
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Fill out the form below to receive a personalized 4-week fitness and meal plan tailored to your unique goals.
            </p>
          </header>

          <PlanGeneratorForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          {error && <div className="mt-8"><ErrorMessage message={error} /></div>}
          
          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {generatedPlan && <PlanDisplay plan={generatedPlan} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
