
import React, { useState, useMemo } from 'react';
import { Search, Filter, Maximize2, X, Download, Share2 } from 'lucide-react';
import type { Photo } from '../types';

const PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/id/10/800/600', title: 'Mountain Mist', category: 'Nature', description: 'Serene mountain peaks covered in thick morning fog.' },
  { id: '2', url: 'https://picsum.photos/id/20/800/600', title: 'Urban Geometry', category: 'Architecture', description: 'Sharp lines and shadows of modern city buildings.' },
  { id: '3', url: 'https://picsum.photos/id/30/800/600', title: 'Coffee Ritual', category: 'Lifestyle', description: 'Steam rising from a freshly brewed morning espresso.' },
  { id: '4', url: 'https://picsum.photos/id/40/800/600', title: 'Ocean Whispers', category: 'Nature', description: 'Turquoise waves crashing against dark volcanic rocks.' },
  { id: '5', url: 'https://picsum.photos/id/50/800/600', title: 'Neon Nights', category: 'Architecture', description: 'Glowing signs and wet asphalt in the heart of the city.' },
  { id: '6', url: 'https://picsum.photos/id/60/800/600', title: 'Autumn Pathway', category: 'Nature', description: 'Golden leaves carpeting a forest trail during fall.' },
  { id: '7', url: 'https://picsum.photos/id/70/800/600', title: 'Modern Workspace', category: 'Lifestyle', description: 'A clean and minimal desk setup for creative professionals.' },
  { id: '8', url: 'https://picsum.photos/id/80/800/600', title: 'Bridge to Nowhere', category: 'Architecture', description: 'Architectural marvel spanning a wide misty river.' },
];

const PhotoGalleryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const categories = ['All', 'Nature', 'Architecture', 'Lifestyle'];

  const filteredPhotos = useMemo(() => {
    return PHOTOS.filter(photo => {
      const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          photo.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || photo.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Curated Gallery</h2>
          <p className="text-slate-400">Exploring visual stories through high-resolution photography</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
            />
          </div>
          
          <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-600/50 transition-all cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <span className="bg-blue-600 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full w-fit mb-2">
                  {photo.category}
                </span>
                <h3 className="text-white font-bold text-lg leading-tight">{photo.title}</h3>
                <div className="flex items-center gap-2 mt-3 text-slate-400">
                  <Maximize2 size={16} />
                  <span className="text-xs">View Full Size</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
            <Filter size={32} />
          </div>
          <p className="text-slate-400 text-lg">No photos found matching your criteria.</p>
          <button 
            onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
            className="mt-4 text-blue-500 hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-sm animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
            <div className="flex-1 bg-black flex items-center justify-center p-2 lg:p-0">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
            
            <div className="w-full lg:w-96 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-blue-600/10 text-blue-400 text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-blue-600/20">
                    {selectedPhoto.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{selectedPhoto.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {selectedPhoto.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                    Resolution: 800 x 600 px
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                    File Format: JPEG
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl font-medium transition-colors">
                  <Download size={18} />
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-2xl font-medium transition-colors">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryView;
