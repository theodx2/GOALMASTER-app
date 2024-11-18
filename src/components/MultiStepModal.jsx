import React, { useState, useEffect } from 'react';
import { FaTimes, FaLightbulb, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { generateSuggestions } from '../utils/openai';

const steps = [
  {
    id: 'vision',
    title: "What is your dream?",
    subtitle: "Share your vision - dream big!",
    placeholder: "I want to..."
  },
  {
    id: 'specific',
    title: "Let us make it concrete",
    subtitle: "What exactly do you want to achieve?",
    placeholder: "Be specific about your goal..."
  },
  {
    id: 'measurable',
    title: "How will you measure success?",
    subtitle: "Define your metrics",
    placeholder: "I will know I have succeeded when..."
  },
  {
    id: 'achievable',
    title: "What is your action plan?",
    subtitle: "Break it down into achievable steps",
    placeholder: "The steps I will take are..."
  },
  {
    id: 'habits',
    title: "Build Supporting Habits",
    subtitle: "What regular actions will help you succeed?",
    isHabitStep: true
  }
];

const frequencies = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Twice a Week' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'bimonthly', label: 'Twice a Month' }
];

const MultiStepModal = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    specific: '',
    measurable: '',
    achievable: '',
    habits: []
  });
  const [suggestion, setSuggestion] = useState('');
  const [currentHabit, setCurrentHabit] = useState({
    name: '',
    frequency: 'daily'
  });

  useEffect(() => {
    if (currentStep > 0 && formData.title) {
      fetchSuggestion();
    }
  }, [currentStep]);

  const fetchSuggestion = async () => {
    const currentField = steps[currentStep].id;
    const newSuggestion = await generateSuggestions(formData.title, currentField);
    setSuggestion(newSuggestion);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const addHabit = () => {
    if (currentHabit.name) {
      setFormData({
        ...formData,
        habits: [...formData.habits, { ...currentHabit, id: Date.now() }]
      });
      setCurrentHabit({ name: '', frequency: 'daily' });
    }
  };

  const removeHabit = (habitId) => {
    setFormData({
      ...formData,
      habits: formData.habits.filter(habit => habit.id !== habitId)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="glass w-full max-w-2xl p-6 rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10"
        >
          <FaTimes />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          <p className="text-sm opacity-70">{steps[currentStep].subtitle}</p>
        </div>

        {steps[currentStep].isHabitStep ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentHabit.name}
                onChange={(e) => setCurrentHabit({ ...currentHabit, name: e.target.value })}
                placeholder="Enter a supporting habit"
                className="goal-input flex-1"
              />
              <select
                value={currentHabit.frequency}
                onChange={(e) => setCurrentHabit({ ...currentHabit, frequency: e.target.value })}
                className="goal-input w-40"
              >
                {frequencies.map(freq => (
                  <option key={freq.id} value={freq.id}>{freq.label}</option>
                ))}
              </select>
              <button
                onClick={addHabit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {formData.habits.map(habit => (
                <div key={habit.id} className="habit-card flex justify-between items-center">
                  <div>
                    <p className="font-medium">{habit.name}</p>
                    <p className="text-sm opacity-70">
                      {frequencies.find(f => f.id === habit.frequency).label}
                    </p>
                  </div>
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="p-2 text-red-500 hover:bg-red-500/20 rounded-full"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <input
            type="text"
            value={formData[steps[currentStep].id]}
            onChange={(e) => setFormData({
              ...formData,
              [steps[currentStep].id]: e.target.value
            })}
            placeholder={steps[currentStep].placeholder}
            className="goal-input"
          />
        )}

        {suggestion && (
          <div className="ai-suggestion">
            <div className="flex items-start gap-3">
              <FaLightbulb className="text-yellow-500 mt-1" />
              <div>
                <p className="font-medium text-sm text-blue-500">AI Suggestion:</p>
                <p className="text-sm opacity-80">{suggestion}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded ${
              currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaArrowLeft />
          </button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`step-indicator ${
                  index === currentStep ? 'active' :
                  index < currentStep ? 'completed' : 'inactive'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {currentStep === steps.length - 1 ? 'Create Goal' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepModal;
