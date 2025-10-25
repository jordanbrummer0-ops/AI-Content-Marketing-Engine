
import React from 'react';
import { EngineIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-card border-b border-dark-border shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <EngineIcon className="w-8 h-8 mr-3 text-brand-purple" />
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
          AI Content Marketing Engine
        </h1>
      </div>
    </header>
  );
};

export default Header;
