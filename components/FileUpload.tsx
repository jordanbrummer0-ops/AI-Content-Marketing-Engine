
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((files: FileList | null) => {
    setError(null);
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
        onFileSelect(file);
      } else {
        setError('Invalid file type. Please upload a video or audio file.');
      }
    }
  }, [onFileSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFile(e.dataTransfer.files);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files);
  };

  return (
    <div className="text-center p-8 bg-dark-card rounded-2xl shadow-2xl border border-dark-border transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-extrabold text-white mb-2">Turn One Video Into A Week of Content</h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        Upload your podcast, webinar, or video, and let our AI engine create a blog post, social media content, and a thumbnail image in minutes.
      </p>
      
      <form
        id="form-file-upload"
        className={`relative w-full h-64 border-2 border-dashed rounded-lg flex flex-col justify-center items-center transition-colors duration-300 ${dragActive ? 'border-brand-purple bg-gray-800' : 'border-dark-border hover:border-brand-blue'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="input-file-upload"
          className="absolute w-full h-full opacity-0 cursor-pointer"
          accept="video/*,audio/*"
          onChange={handleChange}
        />
        <label htmlFor="input-file-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <UploadIcon className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-lg font-semibold text-gray-300">
            <span className="text-brand-blue">Click to upload</span> or drag and drop
          </p>
          <p className="text-gray-500 mt-1">Video or Audio (MP4, MOV, MP3, WAV)</p>
        </label>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FileUpload;
