
import React, { useState } from 'react';
import { ProfileCard } from './components/ProfileCard';
import { ImageAnalyzer } from './components/ImageAnalyzer';
import { KnowledgeQuery } from './components/KnowledgeQuery';
import { BrainCircuit, FileImage } from './components/icons';

type ActiveTab = 'image' | 'knowledge';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('image');

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans">
      <main className="container mx-auto p-4 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
            Talent-Bid
          </h1>
          <p className="text-lg text-gray-400 mt-2">AI-Driven Professional Asset Analysis</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 xl:col-span-3">
            <ProfileCard />
          </aside>

          <div className="lg:col-span-8 xl:col-span-9 bg-base-200 rounded-2xl shadow-lg p-6 min-h-[600px]">
            <div className="flex border-b border-base-300 mb-6">
              <TabButton
                icon={<FileImage />}
                label="Image Analysis"
                isActive={activeTab === 'image'}
                onClick={() => setActiveTab('image')}
              />
              <TabButton
                icon={<BrainCircuit />}
                label="Knowledge Q&A"
                // FIX: Corrected typo from `active-Tab` to `activeTab` to fix compilation errors.
                isActive={activeTab === 'knowledge'}
                onClick={() => setActiveTab('knowledge')}
              />
            </div>
            
            <div>
              {activeTab === 'image' && <ImageAnalyzer />}
              {activeTab === 'knowledge' && <KnowledgeQuery />}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; 2024 Talent-Bid. Redefining professional value.</p>
      </footer>
    </div>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm md:text-base font-medium transition-colors duration-200 ease-in-out focus:outline-none ${
        isActive
          ? 'border-b-2 border-brand-primary text-white'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};


export default App;