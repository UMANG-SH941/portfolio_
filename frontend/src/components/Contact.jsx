import React, { useState, useEffect } from 'react';
import { getPersonalInfo, submitContact } from '../services/api';
import { Mail, Linkedin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await submitContact(formData);
      toast({
        title: "Message Sent!",
        description: response.message || "Thank you for reaching out. I'll get back to you soon."
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)`
        }}
      />

      <div className="max-w-[1400px] mx-auto px-[7.6923%] relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span
            className="text-[#00FFD1] text-lg tracking-wider"
            style={{ fontFamily: 'KodeMono, monospace' }}
          >
            GET IN TOUCH
          </span>
          <h2
            className="text-[#FFFFFF] font-semibold mt-4"
            style={{ fontSize: '48px', letterSpacing: '-0.02em', fontFamily: 'KodeMono, monospace' }}
          >
            Let's Collaborate
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-[#FFFFFF] text-2xl font-semibold mb-4"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                Connect With Me
              </h3>
              <p
                className="text-[#FFFFFF] opacity-85 text-lg leading-relaxed"
                style={{ fontFamily: 'KodeMono, monospace' }}
              >
                I'm always interested in discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo?.email}`}
                className="flex items-center gap-4 bg-[#121212] p-6 border border-[rgba(255,255,255,0.25)] transition-all duration-400 hover:border-[#00FFD1] group"
              >
                <Mail className="text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" size={28} />
                <div>
                  <p
                    className="text-[#4D4D4D] text-sm mb-1"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    Email
                  </p>
                  <p
                    className="text-[#FFFFFF] text-lg"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {personalInfo?.email}
                  </p>
                </div>
              </a>

              <a
                href={`https://${personalInfo?.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#121212] p-6 border border-[rgba(255,255,255,0.25)] transition-all duration-400 hover:border-[#00FFD1] group"
              >
                <Linkedin className="text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" size={28} />
                <div>
                  <p
                    className="text-[#4D4D4D] text-sm mb-1"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    LinkedIn
                  </p>
                  <p
                    className="text-[#FFFFFF] text-lg"
                    style={{ fontFamily: 'KodeMono, monospace' }}
                  >
                    {personalInfo?.linkedin}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#121212] p-8 border border-[rgba(255,255,255,0.25)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[#FFFFFF] text-base mb-2"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#000000] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1] transition-colors duration-300"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[#FFFFFF] text-base mb-2"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#000000] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1] transition-colors duration-300"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-[#FFFFFF] text-base mb-2"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#000000] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1] transition-colors duration-300"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[#FFFFFF] text-base mb-2"
                  style={{ fontFamily: 'KodeMono, monospace' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-[#000000] border border-[rgba(255,255,255,0.25)] text-[#FFFFFF] px-4 py-3 focus:outline-none focus:border-[#00FFD1] transition-colors duration-300 resize-none"
                  style={{ fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#00FFD1] text-[#000000] px-6 py-4 font-medium transition-all duration-400 hover:bg-[rgba(0,255,209,0.1)] hover:text-[#00FFD1] inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: '18px', fontFamily: 'KodeMono, monospace', borderRadius: '0px' }}
              >
                {submitting ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
