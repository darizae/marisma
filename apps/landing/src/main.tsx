import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function LandingScaffold() {
  return (
    <main data-marisma-accent="reedwater" className="min-h-screen bg-mar-surface p-8 font-mar-sans text-mar-text">
      <div className="mx-auto max-w-3xl py-20">
        <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-mar-muted">Marisma</p>
        <h1 className="text-5xl font-semibold tracking-tight">Components for calm, capable interfaces.</h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-mar-muted">
          The React UI library is in development. Component examples and public installation
          instructions will appear when they are verified.
        </p>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><LandingScaffold /></React.StrictMode>);
