import React, { useState, useEffect } from 'react';
import { getExperience } from '../services/api';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperience();
        setExperience(data);
      } catch (error) {
        console.error('Error fetching experience:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-32 relative bg-[#121212]">
        <div className="max-w-[1400px] mx-auto px-[7.6923%] text-center">
          <div className="text-[#00FFD1] text-xl" style={{ fontFamily: 'KodeMono, monospace' }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="experience" className="py-32 relative bg-[#121212]">
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
            EXPERIENCE
          </span>
          <h2
            className="text-[#FFFFFF] font-semibold mt-4"
            style={{ fontSize: '48px', letterSpacing: '-0.02em', fontFamily: 'KodeMono, monospace' }}
          >
            Professional Journey
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="bg-[#000000] border border-[rgba(255,255,255,0.25)] p-8 transition-all duration-400 hover:border-[#00FFD1] hover:transform hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left - Organization & Role */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-3 mb-4">
                    <Briefcase className="text-[#00FFD1] mt-1" size={24} />
                    <div>
                      <h3
                        className="text-[#FFFFFF] text-2xl font-semibold"
                        style={{ fontFamily: 'KodeMono, monospace' }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-[#00FFD1] text-lg mt-1"
                        style={{ fontFamily: 'KodeMono, monospace' }}
                      >
                        {exp.organization}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-[#FFFFFF] opacity-85 text-base leading-relaxed"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {exp.description}
                  </p>
                </div>

                {/* Right - Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-[#00FFD1]" size={20} />
                    <span
                      className="text-[#4D4D4D] text-base"
                      style={{ fontFamily: 'KodeMono, monospace' }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-[#00FFD1]" size={20} />
                    <span
                      className="text-[#4D4D4D] text-base"
                      style={{ fontFamily: 'KodeMono, monospace' }}
                    >
                      {exp.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-[rgba(0,255,209,0.1)] text-[#00FFD1] px-3 py-1 text-sm"
                        style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
