import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function ConsumerScaffold() {
  return <main data-marisma-accent="reedwater" className="min-h-screen bg-mar-surface p-8 font-mar-sans text-mar-text"><h1 className="text-2xl font-semibold">Vite integration scaffold</h1><p className="mt-3 text-base text-mar-muted">No Marisma public components are implemented yet.</p></main>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><ConsumerScaffold /></React.StrictMode>);
