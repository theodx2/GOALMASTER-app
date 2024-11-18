import React, { useState } from 'react';
import { format } from 'date-fns';
import { FaTrash, FaCheck, FaClock, FaCalendarCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const GoalCard = ({ goal, onDelete, onToggle, onHabitComplete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`glass p-4 rounded-xl space-y-3 transition-all duration-300 hover:scale-105 ${
        goal.completed ? 'border-green-500' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{goal.title}</h3>
          <div 
            className="text-sm opacity-70 cursor-pointer flex items-center gap-1 mt-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
            <span>{expanded ? 'Show less' : 'Show details'}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggle(goal.id)}
            className={`p-2 rounded ${
              goal.completed ? 'bg-green-500' : 'bg-gray-500'
            } hover:opacity-80 transition-opacity`}
          >
            <FaCheck className="text-white" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 bg-red-500 rounded hover:opacity-80 transition-opacity"
          >
            <FaTrash className="text-white" />
          </button>
        </div>
      </div>

      <div className={`space-y-4 transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {Object.entries({
            Specific: goal.specific,
            Measurable: goal.measurable,
            Achievable: goal.achievable,
            Relevant: goal.relevant,
            'Time-bound': goal.timeBound
          }).map(([key, value]) => (
            value && (
              <div key={key} className="space-y-1 bg-white/5 p-3 rounded-lg">
                <p className="font-semibold text-blue-400">{key}</p>
                <p className="opacity-80">{value}</p>
              </div>
            )
          ))}
        </div>

        {goal.habits && goal.habits.length > 0 && (
          <div className="border-t border-white/10 pt-3">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <FaCalendarCheck className="text-blue-400" />
              <span>Supporting Habits</span>
            </h4>
            <div className="space-y-2">
              {goal.habits.map(habit => (
                <div 
                  key={habit.id} 
                  className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div>
                    <p className="font-medium">{habit.name}</p>
                    <p className="text-sm opacity-70">{habit.frequency}</p>
                  </div>
                  <button
                    onClick={() => onHabitComplete?.(goal.id, habit.id)}
                    className="p-2 hover:bg-green-500/20 rounded-full transition-colors"
                  >
                    <FaCheck className="text-green-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm opacity-60 pt-2 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <FaClock />
          <span>Created: {format(new Date(goal.createdAt), 'MMM d, yyyy')}</span>
        </div>
        {goal.completed && (
          <div className="flex items-center space-x-2 text-green-500">
            <FaCheck />
            <span>Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;
