import React, { Suspense, useState, useEffect } from 'react';
import { ArrowRight, Settings, User } from 'lucide-react';
import { getPersonalInfo } from '../services/api';
import AdminPanel from './AdminPanel';

// Lazy load Spline
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setLoading(false);
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

  if (loading || !personalInfo) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-[#00FFD1] text-xl" style={{ fontFamily: 'KodeMono, monospace' }}>
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)`
        }}
      />

      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-8 right-8 z-40 bg-[#00FFD1] text-[#000000] p-4 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#6FD2C0]"
        aria-label="Admin Panel"
      >
        <Settings size={24} />
      </button>

      <div className="max-w-[1400px] mx-auto px-[7.6923%] py-32 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Profile Photo */}
            <div className="w-32 h-32 rounded-full bg-[#000000] border-4 border-[#00FFD1] overflow-hidden flex items-center justify-center mb-6">
              {personalInfo?.profile_photo ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${personalInfo.profile_photo}`}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} className="text-[#00FFD1]" />
              )}
            </div>

            <div className="space-y-4">
              <div className="inline-block">
                <span
                  className="text-[#00FFD1] text-lg tracking-wider"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  QUANTUM • PHYSICS • AI
                </span>
              </div>
              <h1
                className="text-[#FFFFFF] font-semibold leading-[1.1]"
                style={{ fontSize: '66px', letterSpacing: '-0.62px', fontFamily: 'KodeMono, monospace' }}
              >
                {personalInfo.name}
              </h1>
              <p
                className="text-[#FFFFFF] opacity-85 text-2xl font-medium"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                {personalInfo.title}
              </p>
              <p
                className="text-[#4D4D4D] text-lg"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                {personalInfo.tagline}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-[#00FFD1] text-[#000000] px-6 py-4 font-medium transition-all duration-400 hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] inline-flex items-center gap-3 min-h-[56px]"
                style={{ fontSize: '18px', fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
              >
                View Projects
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] px-6 py-4 font-medium transition-all duration-400 hover:bg-[#FFFFFF] hover:text-[#000000] inline-flex items-center gap-3 min-h-[56px]"
                style={{ fontSize: '18px', fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
              >
                Get in Touch
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <h3
                  className="text-[#00FFD1] text-4xl font-semibold"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  6+
                </h3>
                <p
                  className="text-[#4D4D4D] text-base mt-1"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  Projects
                </p>
              </div>
              <div>
                <h3
                  className="text-[#00FFD1] text-4xl font-semibold"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  AI/ML
                </h3>
                <p
                  className="text-[#4D4D4D] text-base mt-1"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  Focus Area
                </p>
              </div>
              <div>
                <h3
                  className="text-[#00FFD1] text-4xl font-semibold"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  IIT
                </h3>
                <p
                  className="text-[#4D4D4D] text-base mt-1"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  Research
                </p>
              </div>
            </div>
          </div>

          {/* Right - 3D Spline */}
          <div className="relative h-[700px] flex items-center justify-center">
            <div className="w-[700px] h-[700px] overflow-visible relative">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-[#00FFD1] text-xl" style={{ fontFamily: 'KodeMono, monospace' }}>
                      Loading 3D Scene...
                    </div>
                  </div>
                }
              >
                <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
