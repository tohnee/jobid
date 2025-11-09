
import React from 'react';
import { Github, Linkedin, Mail } from './icons';

export const ProfileCard: React.FC = () => {
  return (
    <div className="bg-base-200 rounded-2xl shadow-lg p-6 sticky top-8">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://picsum.photos/seed/talentbid/128/128"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-base-300 mb-4"
        />
        <h2 className="text-xl font-bold text-white">Alex Doe</h2>
        <p className="text-brand-secondary">Principal AI Engineer</p>
        <p className="text-gray-400 text-sm mt-2 px-4">
          Building the future of intelligent systems. Specialized in large-scale language models and generative AI.
        </p>
      </div>
      <div className="border-t border-base-300 my-6"></div>
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact</h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-brand-primary transition-colors">
            <Mail />
            <span>a.doe@email.com</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-brand-primary transition-colors">
            <Linkedin />
            <span>/in/alex-doe-ai</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-brand-primary transition-colors">
            <Github />
            <span>/alexdoe-ai</span>
          </a>
        </div>
      </div>
    </div>
  );
};
