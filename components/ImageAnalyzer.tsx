
import React, { useState, useCallback, ChangeEvent } from 'react';
import { analyzeImage } from '../services/geminiService';
import { Spinner } from './Spinner';
import { UploadCloud, Sparkles } from './icons';

// Using `declare` to tell TypeScript that `marked` is available globally
declare const marked: {
  parse(markdown: string): string;
};

export const ImageAnalyzer: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("Describe this image in detail. What is its professional significance?");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAnalysis = useCallback(async () => {
    if (!prompt || !imageFile) {
      setError('Please provide an image and a prompt.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const result = await analyzeImage(prompt, base64Data, imageFile.type);
        const htmlResult = marked.parse(result);
        setAnalysis(htmlResult);
        setIsLoading(false);
    };
    reader.onerror = (error) => {
        console.error("FileReader error: ", error);
        setError("Failed to read the image file.");
        setIsLoading(false);
    };
  }, [prompt, imageFile]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Upload Professional Asset</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-base-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {image ? (
                <img src={image} alt="Preview" className="mx-auto h-40 w-auto rounded-md" />
              ) : (
                 <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
              )}
              <div className="flex text-sm text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-base-200 rounded-md font-medium text-brand-primary hover:text-brand-secondary focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Analysis Prompt</label>
          <textarea
            id="prompt"
            rows={6}
            className="flex-grow w-full bg-base-300 rounded-md p-3 text-base-content focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={getAnalysis}
          disabled={isLoading || !image}
          className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-base-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Spinner /> : <Sparkles />}
          {isLoading ? 'Analyzing...' : 'Run AI Analysis'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {(isLoading || analysis) && (
        <div className="bg-base-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Sparkles className="text-brand-secondary"/> AI Analysis Result</h3>
          {isLoading && <div className="flex justify-center p-8"><Spinner /></div>}
          {analysis && <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white" dangerouslySetInnerHTML={{ __html: analysis }} />}
        </div>
      )}
    </div>
  );
};
