import React from 'react';

import Blog1 from '../assets/blog1.jpg';
import Blog2 from '../assets/blog2.jpg';
import Blog3 from '../assets/blog3.jpg';

const Home = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen text-gray-100">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 w-full bg-gradient-to-r from-blue-800/50 to-indigo-800/50">
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Discover the Art of Thoughtful Writing
          </h1>
          <p className="text-xl text-blue-100/90 font-light mb-8">
            Immerse yourself in a world of curated stories, expert insights, and literary exploration
          </p>
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section className="w-full max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Post Card 1 */}
          <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <img 
              src={Blog1} 
              alt="Writing" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
              <span className="text-sm text-blue-300 font-mono">Creative Process</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">The Alchemy of Words</h2>
              <p className="text-gray-200/90 line-clamp-3">
                Exploring the transformative power of language and its ability to shape realities, 
                bridge cultures, and ignite imagination across generations.
              </p>
            </div>
          </div>

          {/* Post Card 2 */}
          <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <img 
              src={Blog2}
              alt="Books" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
              <span className="text-sm text-emerald-300 font-mono">Literary Analysis</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">Modern Classics Revisited</h2>
              <p className="text-gray-200/90 line-clamp-3">
                A fresh perspective on 21st century literature that redefined narrative structures 
                and challenged traditional storytelling conventions.
              </p>
            </div>
          </div>

          {/* Post Card 3 */}
          <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <img 
              src={Blog3}
              alt="Typewriter" 
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
              <span className="text-sm text-amber-300 font-mono">Writing Craft</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">Rhythm in Prose</h2>
              <p className="text-gray-200/90 line-clamp-3">
                Mastering the musicality of language - how sentence structure, pacing, and word 
                choice create immersive reading experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="w-full border-t border-slate-700/50 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h4 className="text-2xl font-light mb-4 md:mb-0">
              The Literary Chronicle
            </h4>
            <nav className="space-x-6 text-gray-400">
              <span>Archive</span>
              <span>Contributors</span>
              <span>Publications</span>
            </nav>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 The Thought Collective. Curated with precision, published with purpose.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;