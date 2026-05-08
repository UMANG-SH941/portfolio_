import React, { useState, useEffect } from 'react';
import { getPersonalInfo } from '../services/api';
import { Mail, Linkedin, Github, Instagram, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
    };
    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#000000] border-t border-[rgba(255,255,255,0.25)] py-16 relative">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)`
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-[#00FFD1] text-3xl font-semibold mb-4"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              {personalInfo?.name || 'Umang Shukla'}
            </h3>
            <p
              className="text-[#4D4D4D] text-base leading-relaxed"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Research Intern at IIT Mandi exploring the frontiers of AI, quantum computing, and computational natural sciences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-[#FFFFFF] text-xl font-semibold mb-4"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Quick Links
            </h4>
            <div className="space-y-2">
              {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-[#4D4D4D] hover:text-[#00FFD1] text-base transition-colors duration-300 capitalize"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4
              className="text-[#FFFFFF] text-xl font-semibold mb-4"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {personalInfo?.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="bg-[rgba(255,255,255,0.1)] p-3 hover:bg-[#00FFD1] text-[#FFFFFF] hover:text-[#000000] transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              )}
              {personalInfo?.linkedin && (
                <a
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[rgba(255,255,255,0.1)] p-3 hover:bg-[#00FFD1] text-[#FFFFFF] hover:text-[#000000] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {personalInfo?.github && (
                <a
                  href={`https://${personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[rgba(255,255,255,0.1)] p-3 hover:bg-[#00FFD1] text-[#FFFFFF] hover:text-[#000000] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {personalInfo?.instagram && (
                <a
                  href={`https://${personalInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[rgba(255,255,255,0.1)] p-3 hover:bg-[#00FFD1] text-[#FFFFFF] hover:text-[#000000] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {personalInfo?.twitter && (
                <a
                  href={`https://${personalInfo.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[rgba(255,255,255,0.1)] p-3 hover:bg-[#00FFD1] text-[#FFFFFF] hover:text-[#000000] transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.25)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-[#4D4D4D] text-base flex items-center gap-2"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              © 2025 {personalInfo?.name || 'Umang Shukla'}. All Rights Reserved.
            </p>
            <p
              className="text-[#4D4D4D] text-sm"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Inspired by CERN, SpaceX & the cosmos
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
