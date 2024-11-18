import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const quotes = [
  {
    text: "Your dreams are the blueprints of your destiny. Build them with purpose.",
    author: "Dream Builder",
    category: "motivation"
  },
  {
    text: "Every small step forward is progress towards your greatest achievements.",
    author: "Dream Builder",
    category: "progress"
  },
  {
    text: "Transform your dreams into reality, one goal at a time.",
    author: "Dream Builder",
    category: "action"
  },
  {
    text: "Your future is created by what you do today, not tomorrow.",
    author: "Dream Builder",
    category: "action"
  },
  {
    text: "The journey of a thousand miles begins with a single step.",
    author: "Dream Builder",
    category: "beginning"
  }
];

const InspirationQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setFadeIn(true);
      }, 500);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass p-8 rounded-xl relative overflow-hidden">
      <div className="absolute top-4 left-4 text-blue-500/20">
        <FaQuoteLeft size={40} />
      </div>
      
      <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <FaStar className="text-yellow-500" />
          <h3 className="text-sm uppercase tracking-wider text-blue-400 font-semibold">
            Daily Inspiration
          </h3>
          <FaStar className="text-yellow-500" />
        </div>
        
        <p className="text-2xl font-bold text-center mb-4 px-8">
          {currentQuote.text}
        </p>
        
        <p className="text-center text-sm opacity-70">
          - {currentQuote.author}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
    </div>
  );
};

export default InspirationQuote;
