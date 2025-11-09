
import React, { useState, useCallback } from 'react';
import { groundedQuery } from '../services/geminiService';
import { GroundingChunk, GroundingMetadata } from '../types';
import { Spinner } from './Spinner';
import { Sparkles, Link } from './icons';

declare const marked: {
  parse(markdown: string): string;
};

export const KnowledgeQuery: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("Who won the most medals at the 2024 Paris Olympics?");
  const [result, setResult] = useState<{ text: string; groundingMetadata: GroundingMetadata | null } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getGroundedAnswer = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a query.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);

    const response = await groundedQuery(prompt);
    
    if (response.text.startsWith('An error occurred:')) {
      setError(response.text);
    } else {
      const htmlText = marked.parse(response.text);
      setResult({ text: htmlText, groundingMetadata: response.groundingMetadata });
    }
    setIsLoading(false);
  }, [prompt]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="knowledge-prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Ask a question
        </label>
        <textarea
          id="knowledge-prompt"
          rows={4}
          className="w-full bg-base-300 rounded-md p-3 text-base-content focus:ring-2 focus:ring-brand-primary focus:outline-none transition"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about recent events, news, or any up-to-date information..."
        />
      </div>

      <div className="text-center">
        <button
          onClick={getGroundedAnswer}
          disabled={isLoading || !prompt}
          className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-base-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Spinner /> : <Sparkles />}
          {isLoading ? 'Querying...' : 'Get Grounded Answer'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {(isLoading || result) && (
        <div className="bg-base-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Sparkles className="text-brand-secondary"/> AI Response</h3>
          {isLoading && <div className="flex justify-center p-8"><Spinner /></div>}
          {result?.text && <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white" dangerouslySetInnerHTML={{ __html: result.text }} />}
          
          {result?.groundingMetadata?.groundingChunks && result.groundingMetadata.groundingChunks.length > 0 && (
            <div className="mt-6 border-t border-base-100 pt-4">
              <h4 className="text-md font-semibold mb-3 flex items-center gap-2 text-gray-300"><Link /> Sources from Google Search</h4>
              <ul className="space-y-2">
                {result.groundingMetadata.groundingChunks.map((chunk: GroundingChunk, index: number) => (
                  chunk.web && (
                    <li key={index} className="truncate">
                      <a
                        href={chunk.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-secondary hover:underline"
                      >
                        {chunk.web.title || chunk.web.uri}
                      </a>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
