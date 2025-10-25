
import React, { useState } from 'react';
import { GeneratedContent, SocialPost } from '../types';
import { CopyIcon, CheckIcon, RefreshIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './icons';

interface ContentDisplayProps {
  content: GeneratedContent | null;
  onReset: () => void;
}

const socialIconMap = {
  Twitter: <TwitterIcon className="w-5 h-5 text-blue-400" />,
  LinkedIn: <LinkedInIcon className="w-5 h-5 text-blue-500" />,
  Instagram: <InstagramIcon className="w-5 h-5 text-pink-500" />,
};

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, onReset }) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const CopyButton: React.FC<{ text: string; id: string }> = ({ text, id }) => (
    <button
      onClick={() => handleCopy(text, id)}
      className="absolute top-3 right-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
      title="Copy to clipboard"
    >
      {copiedStates[id] ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5 text-gray-300" />}
    </button>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white">Your AI-Generated Content is Ready!</h2>
        <p className="text-gray-400 mt-2">Copy, paste, and start growing your audience.</p>
      </div>

      {content?.image && (
        <div className="bg-dark-card rounded-2xl shadow-lg border border-dark-border p-6">
          <h3 className="text-xl font-bold mb-4">Generated Image</h3>
          <div className="flex justify-center">
            <img src={`data:image/jpeg;base64,${content.image}`} alt="Generated thumbnail" className="rounded-lg max-w-full md:max-w-md shadow-lg" />
          </div>
        </div>
      )}

      {content?.blogPost && (
        <div className="bg-dark-card rounded-2xl shadow-lg border border-dark-border p-6 relative">
          <CopyButton text={content.blogPost} id="blog" />
          <h3 className="text-xl font-bold mb-4">Blog Post</h3>
          <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
            {content.blogPost}
          </div>
        </div>
      )}

      {content?.socialPosts && content.socialPosts.length > 0 && (
        <div className="bg-dark-card rounded-2xl shadow-lg border border-dark-border p-6">
          <h3 className="text-xl font-bold mb-4">Social Media Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.socialPosts.map((post, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 relative border border-dark-border">
                <CopyButton text={post.content} id={`social-${index}`} />
                <div className="flex items-center mb-2">
                  {socialIconMap[post.platform]}
                  <span className="ml-2 font-semibold text-white">{post.platform}</span>
                </div>
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="bg-brand-blue text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center"
        >
          <RefreshIcon className="w-6 h-6 mr-2" />
          Create More Content
        </button>
      </div>
    </div>
  );
};

export default ContentDisplay;
