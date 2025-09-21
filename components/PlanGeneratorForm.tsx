
import React from 'react';
import type { FormData } from '../types';
import { Goal, Experience, Equipment, Diet } from '../types';

interface PlanGeneratorFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const InputGroup: React.FC<{ children: React.ReactNode; label: string; htmlFor: string }> = ({ children, label, htmlFor }) => (
    <div>
        <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        {children}
    </div>
);

const TextInput: React.FC<{id: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string}> = (props) => (
    <input
        type="text"
        {...props}
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
);

const SelectInput: React.FC<{id: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode}> = (props) => (
    <select
        {...props}
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
        {props.children}
    </select>
);


export const PlanGeneratorForm: React.FC<PlanGeneratorFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Full Name" htmlFor="name">
          <TextInput id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Alex Doe" />
        </InputGroup>
        
        <InputGroup label="Primary Goal" htmlFor="goal">
          <SelectInput id="goal" name="goal" value={formData.goal} onChange={handleChange}>
            {Object.values(Goal).map(g => <option key={g} value={g}>{g}</option>)}
          </SelectInput>
        </InputGroup>

        <InputGroup label="Experience Level" htmlFor="experience">
          <SelectInput id="experience" name="experience" value={formData.experience} onChange={handleChange}>
            {Object.values(Experience).map(e => <option key={e} value={e}>{e}</option>)}
          </SelectInput>
        </InputGroup>

        <InputGroup label="Available Equipment" htmlFor="equipment">
          <SelectInput id="equipment" name="equipment" value={formData.equipment} onChange={handleChange}>
            {Object.values(Equipment).map(e => <option key={e} value={e}>{e}</option>)}
          </SelectInput>
        </InputGroup>

        <InputGroup label="Dietary Preference" htmlFor="diet">
          <SelectInput id="diet" name="diet" value={formData.diet} onChange={handleChange}>
            {Object.values(Diet).map(d => <option key={d} value={d}>{d}</option>)}
          </SelectInput>
        </InputGroup>

        <InputGroup label="Allergies or Restrictions" htmlFor="allergies">
          <TextInput id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="e.g., Peanuts, Dairy" />
        </InputGroup>
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading || !formData.name}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Generating Your Plan...' : 'Generate Plan'}
      </button>
    </form>
  );
};
