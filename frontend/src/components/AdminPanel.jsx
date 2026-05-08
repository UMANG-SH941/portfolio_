import React, { useState, useEffect } from 'react';
import { getPersonalInfo, getProjects, createProject, updateProject, deleteProject, uploadProfilePhoto } from '../services/api';
import { Upload, User, X, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminPanel = ({ onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [personalInfo, setPersonalInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // Project form state
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tags: '',
    image: '',
    status: 'In Progress',
    github_link: '',
    live_link: '',
    sponsor_link: '',
    seeking_sponsors: false
  });

  useEffect(() => {
    fetchPersonalInfo();
    fetchProjects();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const data = await getPersonalInfo();
      setPersonalInfo(data);
      if (data.profile_photo) {
        setPreview(`${process.env.REACT_APP_BACKEND_URL}${data.profile_photo}`);
      }
    } catch (error) {
      console.error('Error fetching personal info:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      await uploadProfilePhoto(selectedFile);
      toast({
        title: 'Success!',
        description: 'Profile photo updated successfully.',
      });
      await fetchPersonalInfo();
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleProjectFormChange = (field, value) => {
    setProjectForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditProject = (project) => {
    setEditingProject(project.id);
    setProjectForm({
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      image: project.image,
      status: project.status,
      github_link: project.github_link || '',
      live_link: project.live_link || '',
      sponsor_link: project.sponsor_link || '',
      seeking_sponsors: project.seeking_sponsors || false
    });
    setActiveTab('projects');
  };

  const handleSaveProject = async () => {
    try {
      const projectData = {
        ...projectForm,
        tags: projectForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        order: projects.length + 1
      };

      if (editingProject) {
        await updateProject(editingProject, projectData);
        toast({
          title: 'Success!',
          description: 'Project updated successfully.',
        });
      } else {
        await createProject(projectData);
        toast({
          title: 'Success!',
          description: 'Project created successfully.',
        });
      }

      resetProjectForm();
      await fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(projectId);
      toast({
        title: 'Success!',
        description: 'Project deleted successfully.',
      });
      await fetchProjects();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      tags: '',
      image: '',
      status: 'In Progress',
      github_link: '',
      live_link: '',
      sponsor_link: '',
      seeking_sponsors: false
    });
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.95)] z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121212] border-2 border-[#00FFD1] max-w-4xl w-full p-8 relative my-8" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FFFFFF] hover:text-[#00FFD1] transition-colors"
        >
          <X size={28} />
        </button>

        {/* Header */}
        <h2
          className="text-[#00FFD1] text-4xl font-semibold mb-8"
          style={{ fontFamily: 'KodeMono, monospace' }}
        >
          Admin Panel
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[rgba(255,255,255,0.25)]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium transition-all duration-300 ${
              activeTab === 'profile'
                ? 'text-[#00FFD1] border-b-2 border-[#00FFD1]'
                : 'text-[#4D4D4D] hover:text-[#FFFFFF]'
            }`}
            style={{ fontFamily: 'KodeMono, monospace' }}
          >
            Profile Photo
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-all duration-300 ${
              activeTab === 'projects'
                ? 'text-[#00FFD1] border-b-2 border-[#00FFD1]'
                : 'text-[#4D4D4D] hover:text-[#FFFFFF]'
            }`}
            style={{ fontFamily: 'KodeMono, monospace' }}
          >
            Manage Projects
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3
              className="text-[#FFFFFF] text-2xl font-semibold mb-4"
              style={{ fontFamily: 'KodeMono, monospace' }}
            >
              Profile Photo
            </h3>

            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="w-48 h-48 rounded-full bg-[#000000] border-4 border-[#00FFD1] overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={80} className="text-[#00FFD1]" />
                )}
              </div>

              <p
                className="text-[#4D4D4D] text-lg"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                {personalInfo?.name}
              </p>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="photo-upload"
                className="flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] px-6 py-4 cursor-pointer transition-all duration-300 hover:bg-[#FFFFFF] hover:text-[#000000]"
                style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
              >
                <Upload size={20} />
                Choose Photo
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile && (
                <div className="flex items-center justify-between bg-[#000000] p-4 border border-[rgba(255,255,255,0.25)]">
                  <p
                    className="text-[#FFFFFF] text-sm"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {selectedFile.name}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(
                        personalInfo?.profile_photo
                          ? `${process.env.REACT_APP_BACKEND_URL}${personalInfo.profile_photo}`
                          : null
                      );
                    }}
                    className="text-[#00FFD1] hover:text-[#FFFFFF]"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <button
                onClick={handleUploadPhoto}
                disabled={!selectedFile || uploading}
                className="w-full bg-[#00FFD1] text-[#000000] px-6 py-4 font-medium transition-all duration-400 hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: '18px', fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
              >
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              {editingProject && (
                <button
                  onClick={resetProjectForm}
                  className="bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] px-4 py-2 text-sm transition-all duration-300 hover:bg-[#FFFFFF] hover:text-[#000000]"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* Project Form */}
            <div className="space-y-4 bg-[#000000] p-6 border border-[rgba(255,255,255,0.25)]">
              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => handleProjectFormChange('title', e.target.value)}
                  className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="Project Title"
                />
              </div>

              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                  Description *
                </label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => handleProjectFormChange('description', e.target.value)}
                  rows="4"
                  className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1] resize-none"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="Project Description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                    Tags (comma-separated) *
                  </label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => handleProjectFormChange('tags', e.target.value)}
                    className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                    style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                    placeholder="Python, AI, ML"
                  />
                </div>

                <div>
                  <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                    Status *
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => handleProjectFormChange('status', e.target.value)}
                    className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                    style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                  Image URL *
                </label>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => handleProjectFormChange('image', e.target.value)}
                  className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                  GitHub Link
                </label>
                <input
                  type="text"
                  value={projectForm.github_link}
                  onChange={(e) => handleProjectFormChange('github_link', e.target.value)}
                  className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                  Live Demo Link
                </label>
                <input
                  type="text"
                  value={projectForm.live_link}
                  onChange={(e) => handleProjectFormChange('live_link', e.target.value)}
                  className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="https://demo.example.com"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="seeking-sponsors"
                  checked={projectForm.seeking_sponsors}
                  onChange={(e) => handleProjectFormChange('seeking_sponsors', e.target.checked)}
                  className="w-5 h-5"
                />
                <label htmlFor="seeking-sponsors" className="text-[#FFFFFF] text-sm" style={{ fontFamily: 'KodeMono, monospace' }}>
                  Seeking Sponsors
                </label>
              </div>

              {projectForm.seeking_sponsors && (
                <div>
                  <label className="block text-[#FFFFFF] text-sm mb-2" style={{ fontFamily: 'KodeMono, monospace' }}>
                    Sponsor Link
                  </label>
                  <input
                    type="text"
                    value={projectForm.sponsor_link}
                    onChange={(e) => handleProjectFormChange('sponsor_link', e.target.value)}
                    className="w-full bg-[#121212] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1]"
                    style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                    placeholder="https://github.com/sponsors/username"
                  />
                </div>
              )}

              <button
                onClick={handleSaveProject}
                className="w-full bg-[#00FFD1] text-[#000000] px-6 py-4 font-medium transition-all duration-400 hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] flex items-center justify-center gap-2"
                style={{ fontSize: '18px', fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
              >
                <Save size={20} />
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>

            {/* Existing Projects */}
            <div className="mt-8">
              <h4 className="text-[#FFFFFF] text-xl font-semibold mb-4" style={{ fontFamily: 'KodeMono, monospace' }}>
                Existing Projects ({projects.length})
              </h4>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-[#000000] p-4 border border-[rgba(255,255,255,0.25)] flex justify-between items-center hover:border-[#00FFD1] transition-all duration-300"
                  >
                    <div>
                      <h5 className="text-[#FFFFFF] font-medium" style={{ fontFamily: 'KodeMono, monospace' }}>
                        {project.title}
                      </h5>
                      <p className="text-[#4D4D4D] text-sm" style={{ fontFamily: 'KodeMono, monospace' }}>
                        {project.status}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] p-2 transition-all duration-300 hover:bg-[#00FFD1] hover:text-[#000000]"
                        style={{ borderRadius: '0px' }}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="bg-[rgba(255,255,255,0.1)] text-[#FFFFFF] p-2 transition-all duration-300 hover:bg-[#FF0000] hover:text-[#FFFFFF]"
                        style={{ borderRadius: '0px' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
