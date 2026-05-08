import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? 'bg-[#000000]/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
      style={{ borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.25)' : 'none' }}
    >
      <div className="max-w-[1400px] mx-auto px-[7.6923%] py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-[#00FFD1] flex items-center justify-center">
              <h1 className="text-[#000000] text-xl font-bold" style={{ fontFamily: 'KodeMono, monospace' }}>
                US
              </h1>
            </div>
            <span className="text-[#FFFFFF] text-lg font-semibold hidden sm:block" style={{ fontFamily: 'KodeMono, monospace' }}>
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#00FFD1] text-[#000000] px-6 py-3 font-medium transition-all duration-400 hover:bg-rgba(0,255,209,0.1) hover:text-[#00FFD1]"
              style={{ fontFamily: 'KodeMono, monospace', fontSize: '18px', borderRadius: '0px' }}
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#FFFFFF] p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300 text-left"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300 text-left"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300 text-left"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-[#4D4D4D] hover:text-[#FFFFFF] text-lg font-normal transition-colors duration-300 text-left"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#00FFD1] text-[#000000] px-6 py-3 font-medium transition-all duration-400 w-fit"
              style={{ fontFamily: 'KodeMono, monospace', fontSize: '18px', borderRadius: '0px' }}
            >
              Contact
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
