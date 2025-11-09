
import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const Mail: React.FC = () => (
  <Icon>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

export const Linkedin: React.FC = () => (
    <Icon>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </Icon>
);

export const Github: React.FC = () => (
    <Icon>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </Icon>
);

export const UploadCloud: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
    </Icon>
);

export const Sparkles: React.FC = () => (
    <Icon>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
    </Icon>
);

export const BrainCircuit: React.FC = () => (
    <Icon>
        <path d="M12 5a3 3 0 1 0-5.993.142" />
        <path d="M18 5a3 3 0 1 0-5.993.142" />
        <path d="M21 12a3 3 0 1 0-.142-5.993" />
        <path d="M21 12a3 3 0 1 0 .142 5.993" />
        <path d="M18 19a3 3 0 1 0 5.993-.142" />
        <path d="M12 19a3 3 0 1 0 5.993-.142" />
        <path d="M6 19a3 3 0 1 0 .142-5.993" />
        <path d="M6 19a3 3 0 1 0-.142 5.993" />
        <path d="M3 12a3 3 0 1 0 5.993.142" />
        <path d="M3 12a3 3 0 1 0 .142-5.993" />
        <path d="M12 5a3 3 0 0 0 0 6" />
        <path d="M12 13a3 3 0 0 0 0 6" />
        <path d="M12 19v-1a2 2 0 0 1 2-2h1" />
        <path d="M12 5v1a2 2 0 0 0 2 2h1" />
        <path d="M6 12H5a2 2 0 0 1-2-2V9" />
        <path d="M18 12h1a2 2 0 0 0 2-2V9" />
    </Icon>
);

export const FileImage: React.FC = () => (
    <Icon>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <circle cx="10" cy="12" r="2" />
        <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
    </Icon>
);

export const Link: React.FC = () => (
    <Icon>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </Icon>
);

