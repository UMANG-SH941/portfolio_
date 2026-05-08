import React, { useState, useEffect } from 'react';
import { getSkills } from '../services/api';
import { Code, Atom, Wrench } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState({ technical: [], domains: [], tools: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-32 relative bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-[7.6923%] text-center">
          <div className="text-[#00FFD1] text-xl" style={{ fontFamily: 'KodeMono, monospace' }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="skills" className="py-32 relative bg-[#121212]">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)`
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className="text-[#00FFD1] text-lg tracking-wider"
            style={{ fontFamily: 'KodeMono, monospace' }}
          >
            SKILLS & EXPERTISE
          </span>
          <h2
            className="text-[#FFFFFF] font-semibold mt-4"
            style={{ fontSize: '48px', letterSpacing: '-0.02em', fontFamily: 'KodeMono, monospace' }}
          >
            Technical Arsenal
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <div className="bg-[#000000] border border-[rgba(255,255,255,0.25)] p-8 transition-all duration-400 hover:border-[#00FFD1]">
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-[#00FFD1]" size={32} />
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                Technical
              </h3>
            </div>
            <div className="space-y-3">
              {skills.technical.map((skill, index) => (
                <div
                  key={index}
                  className="text-[#FFFFFF] opacity-85 text-base flex items-center gap-2 group"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  <span className="text-[#00FFD1] transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Expertise */}
          <div className="bg-[#000000] border border-[rgba(255,255,255,0.25)] p-8 transition-all duration-400 hover:border-[#00FFD1]">
            <div className="flex items-center gap-3 mb-6">
              <Atom className="text-[#00FFD1]" size={32} />
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                Domains
              </h3>
            </div>
            <div className="space-y-3">
              {skills.domains.map((domain, index) => (
                <div
                  key={index}
                  className="text-[#FFFFFF] opacity-85 text-base flex items-center gap-2 group"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  <span className="text-[#00FFD1] transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                  <span>{domain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="bg-[#000000] border border-[rgba(255,255,255,0.25)] p-8 transition-all duration-400 hover:border-[#00FFD1]">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="text-[#00FFD1]" size={32} />
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                Tools
              </h3>
            </div>
            <div className="space-y-3">
              {skills.tools.map((tool, index) => (
                <div
                  key={index}
                  className="text-[#FFFFFF] opacity-85 text-base flex items-center gap-2 group"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  <span className="text-[#00FFD1] transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
