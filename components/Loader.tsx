
import React from 'react';
import { SparklesIcon } from './icons';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-dark-card rounded-2xl shadow-2xl border border-dark-border">
      <SparklesIcon className="w-16 h-16 text-brand-purple animate-pulse" />
      <h2 className="text-2xl font-bold text-white mt-6 mb-2">AI Engine is Working...</h2>
      <p className="text-gray-400 text-center">{message || 'Generating your content, please wait.'}</p>
      <div className="w-full bg-dark-border rounded-full h-2.5 mt-8">
        <div className="bg-gradient-to-r from-brand-purple to-brand-pink h-2.5 rounded-full animate-loader-progress"></div>
      </div>
       <style>{`
        @keyframes loader-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loader-progress {
          animation: loader-progress 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
