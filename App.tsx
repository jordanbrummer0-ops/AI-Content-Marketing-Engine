
import React, { useState, useCallback } from 'react';
import { AppStep, ContentType, GeneratedContent, SocialPost } from './types';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ContentTypeSelector from './components/ContentTypeSelector';
import ContentDisplay from './components/ContentDisplay';
import { generateBlogPost, generateSocialPosts, generateImage } from './services/geminiService';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.Upload);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    // In a real app, you'd send the file to a backend for transcription.
    // Here we'll simulate a transcript for demonstration purposes.
    setTranscript(`This is a simulated transcript for the file "${file.name}". The content is about the importance of digital marketing in 2024, focusing on AI-driven strategies, content personalization, and the rise of short-form video content. Key takeaways include leveraging data analytics for customer insights, creating authentic brand narratives, and adapting to new social media platforms to stay ahead of the curve.`);
    setCurrentStep(AppStep.SelectContent);
  };

  const handleGenerateContent = useCallback(async (selectedTypes: ContentType[]) => {
    if (!transcript) {
      setError('No transcript available to generate content.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    const newContent: GeneratedContent = {};

    try {
      if (selectedTypes.includes(ContentType.BlogPost)) {
        setLoadingMessage('Crafting an insightful blog post...');
        newContent.blogPost = await generateBlogPost(transcript);
      }
      if (selectedTypes.includes(ContentType.SocialPosts)) {
        setLoadingMessage('Generating scroll-stopping social posts...');
        newContent.socialPosts = await generateSocialPosts(transcript);
      }
      if (selectedTypes.includes(ContentType.Image)) {
        setLoadingMessage('Designing a stunning thumbnail image...');
        newContent.image = await generateImage(transcript);
      }
      setGeneratedContent(newContent);
      setCurrentStep(AppStep.Display);
    } catch (err) {
      console.error('Error generating content:', err);
      setError('An error occurred while generating content. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [transcript]);

  const handleReset = () => {
    setCurrentStep(AppStep.Upload);
    setUploadedFile(null);
    setTranscript('');
    setGeneratedContent(null);
    setIsLoading(false);
    setError(null);
  };

  const renderStep = () => {
    if (isLoading) {
      return <Loader message={loadingMessage} />;
    }

    switch (currentStep) {
      case AppStep.Upload:
        return <FileUpload onFileSelect={handleFileSelect} />;
      case AppStep.SelectContent:
        return (
          <ContentTypeSelector
            fileName={uploadedFile?.name || ''}
            onGenerate={handleGenerateContent}
            onBack={handleReset}
          />
        );
      case AppStep.Display:
        return (
          <ContentDisplay
            content={generatedContent}
            onReset={handleReset}
          />
        );
      default:
        return <FileUpload onFileSelect={handleFileSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {renderStep()}
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by AI Alex Hormozi's Blueprint & Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
