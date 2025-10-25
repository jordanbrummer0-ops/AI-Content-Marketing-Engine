
import React, { useState } from 'react';
import { ContentType } from '../types';
import { BlogPostIcon, ImageIcon, SocialIcon, ArrowLeftIcon, SparklesIcon } from './icons';

interface ContentTypeSelectorProps {
  fileName: string;
  onGenerate: (selectedTypes: ContentType[]) => void;
  onBack: () => void;
}

const contentOptions = [
  { id: ContentType.BlogPost, label: 'Blog Post', description: 'A long-form article for your website.', icon: <BlogPostIcon className="w-8 h-8" /> },
  { id: ContentType.SocialPosts, label: 'Social Media Posts', description: 'Tweets, LinkedIn & Instagram posts.', icon: <SocialIcon className="w-8 h-8" /> },
  { id: ContentType.Image, label: 'Thumbnail Image', description: 'A catchy image for your content.', icon: <ImageIcon className="w-8 h-8" /> },
];

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ fileName, onGenerate, onBack }) => {
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>([
    ContentType.BlogPost,
    ContentType.SocialPosts,
    ContentType.Image,
  ]);

  const toggleContentType = (type: ContentType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = () => {
    if (selectedTypes.length > 0) {
      onGenerate(selectedTypes);
    }
  };

  return (
    <div className="bg-dark-card rounded-2xl shadow-2xl border border-dark-border p-8">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition-colors mr-4">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Choose Your Content Arsenal</h2>
          <p className="text-gray-400">File ready for processing: <span className="font-medium text-brand-blue">{fileName}</span></p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {contentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleContentType(option.id)}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedTypes.includes(option.id)
                ? 'border-brand-purple bg-purple-900/20 scale-105'
                : 'border-dark-border bg-gray-800 hover:border-brand-blue'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`text-brand-pink ${!selectedTypes.includes(option.id) && 'opacity-50'}`}>{option.icon}</div>
              <input
                type="checkbox"
                checked={selectedTypes.includes(option.id)}
                readOnly
                className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-brand-purple focus:ring-brand-purple"
              />
            </div>
            <h3 className="text-lg font-semibold text-white">{option.label}</h3>
            <p className="text-gray-400 text-sm">{option.description}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={selectedTypes.length === 0}
        className="w-full flex items-center justify-center bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        <SparklesIcon className="w-6 h-6 mr-2"/>
        Generate Content
      </button>
    </div>
  );
};

export default ContentTypeSelector;
