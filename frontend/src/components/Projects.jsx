import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import { Github, ExternalLink, Heart } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'In Progress', 'Completed', 'Research'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProjects(filter);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const filteredProjects = filter === 'All' ? projects : projects;

  return (
    <section id="projects" className="py-32 relative">
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
            PROJECTS
          </span>
          <h2
            className="text-[#FFFFFF] font-semibold mt-4"
            style={{ fontSize: '48px', letterSpacing: '-0.02em', fontFamily: 'KodeMono, monospace' }}
          >
            Building the Future
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 font-medium transition-all duration-400 ${
                filter === category
                  ? 'bg-[#00FFD1] text-[#000000]'
                  : 'bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]'
              }`}
              style={{ fontSize: '16px', fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-[#121212] border border-[rgba(255,255,255,0.25)] overflow-hidden transition-all duration-400 hover:border-[#00FFD1] hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,209,0.3)] group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span
                    className="bg-[#00FFD1] text-[#000000] px-3 py-1 text-sm font-medium"
                    style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  >
                    {project.status}
                  </span>
                  {project.seeking_sponsors && (
                    <div className="bg-[#000000] p-2">
                      <Heart className="text-[#00FFD1]" size={16} fill="#00FFD1" />
                    </div>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-[#FFFFFF] text-xl font-semibold"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {project.title}
                  </h3>
                </div>
                <p
                  className="text-[#FFFFFF] opacity-85 text-base mb-4 leading-relaxed"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-[rgba(0,255,209,0.1)] text-[#00FFD1] px-2 py-1 text-xs transition-all duration-300 hover:bg-[#00FFD1] hover:text-[#000000]"
                      style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-[#FFFFFF] hover:text-[#000000]"
                      style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-[#FFFFFF] hover:text-[#000000]"
                      style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>

                {/* Sponsor Link */}
                {project.seeking_sponsors && project.sponsor_link && (
                  <a
                    href={project.sponsor_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#00FFD1] text-[#000000] px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] hover:scale-105"
                    style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  >
                    <Heart size={16} />
                    Sponsor This Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
