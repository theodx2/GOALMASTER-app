import React from 'react';
import { FaCheckCircle, FaHourglassHalf, FaBullseye, FaCalendarCheck } from 'react-icons/fa';
import useStore from '../store/useStore';

const Dashboard = () => {
  const goals = useStore((state) => state.goals);
  
  const stats = [
    {
      icon: <FaCheckCircle className="text-green-500 text-2xl" />,
      title: 'Completed',
      value: goals.filter(goal => goal.completed).length,
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      icon: <FaHourglassHalf className="text-blue-500 text-2xl" />,
      title: 'In Progress',
      value: goals.filter(goal => !goal.completed).length,
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: <FaBullseye className="text-purple-500 text-2xl" />,
      title: 'Total Goals',
      value: goals.length,
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      icon: <FaCalendarCheck className="text-yellow-500 text-2xl" />,
      title: 'Active Habits',
      value: goals.reduce((acc, goal) => acc + (goal.habits?.length || 0), 0),
      color: 'from-yellow-500/20 to-yellow-600/20'
    }
  ];

  const calculateProgress = () => {
    if (goals.length === 0) return 0;
    return Math.round((goals.filter(goal => goal.completed).length / goals.length) * 100);
  };

  return (
    <div className="glass p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Progress Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`glass p-4 rounded-lg bg-gradient-to-br ${stat.color} transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center space-x-3">
              {stat.icon}
              <div>
                <p className="text-sm opacity-70">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {goals.length > 0 && (
        <div className="mt-6 p-4 glass bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm opacity-70">Overall Progress</span>
            <span className="font-bold">{calculateProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      )}

      {goals.length === 0 && (
        <div className="text-center p-8 glass mt-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <p className="text-lg opacity-70">Start your journey by adding your first goal!</p>
          <p className="text-sm opacity-50 mt-2">Click the "New Dream" button to begin</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
