import React, { useState, useEffect } from 'react';
import { getPersonalInfo, getEducation, getCertifications, getLanguages } from '../services/api';
import { GraduationCap, Award, Languages } from 'lucide-react';

const About = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoData, eduData, certData, langData] = await Promise.all([
          getPersonalInfo(),
          getEducation(),
          getCertifications(),
          getLanguages()
        ]);
        setPersonalInfo(infoData);
        setEducation(eduData);
        setCertifications(certData);
        setLanguages(langData);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-32 relative">
        <div className="max-w-[1400px] mx-auto px-[7.6923%] text-center">
          <div className="text-[#00FFD1] text-xl" style={{ fontFamily: 'KodeMono, monospace' }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="about" className="py-32 relative">
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
            ABOUT ME
          </span>
          <h2
            className="text-[#FFFFFF] font-semibold mt-4"
            style={{ fontSize: '48px', letterSpacing: '-0.02em', fontFamily: 'KodeMono, monospace' }}
          >
            Journey Through
            <br />
            Science & Innovation
          </h2>
        </div>

        {/* Bio */}
        <div className="mb-20">
          <p
            className="text-[#FFFFFF] opacity-85 text-xl leading-relaxed max-w-4xl"
            style={{ fontFamily: 'KodeMono, monospace' }}
          >
            {personalInfo?.bio}
          </p>
        </div>

        {/* Education, Certifications, Languages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Education */}
          <div className="bg-[#121212] p-8 border border-[rgba(255,255,255,0.25)] transition-all duration-400 hover:border-[#00FFD1]">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-[#00FFD1]" size={28} />
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                Education
              </h3>
            </div>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-[#00FFD1] pl-4">
                  <h4
                    className="text-[#FFFFFF] text-lg font-medium"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    className="text-[#4D4D4D] text-base mt-1"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className="text-[#00FFD1] text-sm mt-2"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {edu.field} • {edu.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-[#121212] p-8 border border-[rgba(255,255,255,0.25)] transition-all duration-400 hover:border-[#00FFD1]">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-[#00FFD1]" size={28} />
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                Certifications
              </h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="text-[#FFFFFF] opacity-85 text-base flex items-start gap-2"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  <span className="text-[#00FFD1] mt-1">•</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-[#121212] p-8 border border-[rgba(255,255,255,0.25)] transition-all duration-400 hover:border-[#00FFD1]">
            <div className="flex items-center gap-3 mb-6">
              <Languages className="text-[#00FFD1]" size={28} />
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                Languages
              </h3>
            </div>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-[#FFFFFF] text-base font-medium"
                      style={{ fontFamily: 'KodeMono, monospace' }}
                    >
                      {lang.language}
                    </span>
                  </div>
                  <p
                    className="text-[#4D4D4D] text-sm"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {lang.proficiency}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
