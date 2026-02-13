
import React, { useState } from 'react';
import { Calculator, Image, Github, GraduationCap, LayoutDashboard } from 'lucide-react';
import CalculatorView from './components/CalculatorView';
import PhotoGalleryView from './components/PhotoGalleryView';
import type { AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('calculator');

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">CSBU103 Hub</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveView('calculator')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeView === 'calculator'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Calculator size={20} />
            <span className="font-medium">Calculator</span>
          </button>

          <button
            onClick={() => setActiveView('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeView === 'gallery'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Image size={20} />
            <span className="font-medium">Photo Gallery</span>
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <p className="text-xs text-slate-500 uppercase font-bold mb-2">Student Assignment</p>
            <p className="text-sm font-medium">Week #4 Project</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Github size={14} />
              <span className="truncate">CSBU103-Assignments</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto">
        <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} className="text-slate-500" />
            <span className="text-slate-500">/</span>
            <span className="text-slate-300 capitalize">{activeView}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              Active Session
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'calculator' ? <CalculatorView /> : <PhotoGalleryView />}
        </div>
      </main>
    </div>
  );
};

export default App;
