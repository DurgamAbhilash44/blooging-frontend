import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 min-h-screen text-gray-100">

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            About Insightful Chronicles
          </h1>
          <p className="text-xl text-blue-100/90 font-light mb-8 leading-relaxed">
            A sanctuary for curious minds and passionate storytellers, where ideas transcend boundaries
            and knowledge finds its voice through the art of writing.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-slate-800/40 p-8 rounded-2xl shadow-xl border border-slate-700/50">
          <h2 className="text-3xl font-bold mb-6 text-emerald-400">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            To cultivate a thriving ecosystem of writers and readers, fostering meaningful dialogue
            through carefully curated content. We bridge the gap between profound insight and
            accessible expression, empowering voices that shape intellectual discourse.
          </p>
        </div>

        <div className="bg-slate-800/40 p-8 rounded-2xl shadow-xl border border-slate-700/50">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Content Philosophy</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Every published piece undergoes rigorous evaluation by our editorial collective,
            ensuring depth, originality, and factual accuracy. We champion diverse perspectives
            while maintaining academic rigor and literary excellence across all genres.
          </p>
        </div>
      </section>

      


      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2024 The Insight Collective. Crafting intellectual legacies through the written word.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;