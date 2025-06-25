
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Building, DollarSign, Mail, Info, ArrowRight, Phone, MapPin, Star } from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Close menu when clicking outside or pressing ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Form validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Projects', href: '#projects', icon: Building },
    { name: 'Pricing', href: '#pricing', icon: DollarSign },
    { name: 'Contact Us', href: '#contact', icon: Mail },
    { name: 'About Us', href: '#about', icon: Info },
  ];

  const projects = [
    {
      title: 'Luxury Apartments',
      description: 'Modern luxury living in the heart of Birmingham with premium amenities and stunning city views.',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      // Replace with: Your luxury apartment complex image
    },
    {
      title: 'Family Homes',
      description: 'Spacious family residences designed for comfort and contemporary living in Birmingham\'s finest neighborhoods.',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      // Replace with: Your family home development image
    },
    {
      title: 'City Lofts',
      description: 'Urban sophistication meets modern design in these exclusive loft spaces perfect for professionals.',
      image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      // Replace with: Your city loft project image
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      {/* Navigation */}
      <nav className="relative bg-white shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#1F2937]">Elbi Homes</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[#4B5563] hover:text-[#1F2937] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                className="menu-button bg-white p-2 rounded-md text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F3E8D2] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4B5563] transition-colors duration-200"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`mobile-menu lg:hidden absolute top-16 inset-x-0 z-50 transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-white shadow-lg border-t border-[#F3E8D2]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#4B5563] hover:text-[#1F2937] hover:bg-[#F3E8D2] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.6), rgba(31, 41, 55, 0.6)), url('https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          // Replace with: Your premium Birmingham property hero image
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your Dream Home with 
              <span className="text-[#F3E8D2]"> Elbi Homes</span> in Birmingham
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Premium properties tailored to your lifestyle, crafted with excellence and designed for modern living
            </p>
            <button className="bg-[#F3E8D2] text-[#1F2937] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#FFF8E7] transition-colors duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <span>Explore Properties</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Recent Projects
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Explore our latest developments showcasing exceptional design and quality craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-[#F3E8D2] text-[#1F2937] px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[#4B5563] mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <button className="bg-[#1F2937] text-white px-6 py-2 rounded-md hover:bg-[#4B5563] transition-colors duration-200 inline-flex items-center space-x-2">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#FFF8E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
            Flexible Plans for Every Budget
          </h2>
          <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
            From starter homes to luxury estates, we offer financing options and pricing plans designed to make your dream home affordable
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-[#F3E8D2]" fill="currentColor" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Premium Properties</h3>
            <p className="text-[#4B5563] mb-6">Starting from competitive rates with flexible payment options</p>
            <button className="bg-[#1F2937] text-white px-8 py-3 rounded-lg hover:bg-[#4B5563] transition-colors duration-200 inline-flex items-center space-x-2">
              <span>View Pricing</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-6">
                About Elbi Homes
              </h2>
              <p className="text-lg text-[#4B5563] mb-6">
                Trusted real estate experts in Birmingham since 2010, we've been helping families and individuals find their perfect homes throughout the West Midlands.
              </p>
              <p className="text-[#4B5563] mb-8">
                Our commitment to excellence, attention to detail, and deep understanding of the Birmingham property market makes us the preferred choice for discerning buyers and investors.
              </p>
              <button className="bg-[#F3E8D2] text-[#1F2937] px-6 py-3 rounded-lg hover:bg-[#1F2937] hover:text-white transition-colors duration-200 inline-flex items-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern Birmingham architecture"
                className="rounded-lg shadow-lg"
                loading="lazy"
                // Replace with: Your team or office image
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-[#FFF8E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Ready to find your dream home? Get in touch with our expert team today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#1F2937] mb-6">Send us a message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1F2937] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F3E8D2] focus:border-transparent transition-colors duration-200 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1F2937] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F3E8D2] focus:border-transparent transition-colors duration-200 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1F2937] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F3E8D2] focus:border-transparent transition-colors duration-200 resize-vertical ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your property requirements..."
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1F2937] text-white py-3 px-6 rounded-lg hover:bg-[#4B5563] transition-colors duration-200 font-semibold inline-flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#1F2937] mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-[#F3E8D2] mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-[#1F2937]">Visit Our Office</h4>
                      <p className="text-[#4B5563]">123 High Street<br />Birmingham, B1 1AA<br />United Kingdom</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-[#F3E8D2] mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-[#1F2937]">Call Us</h4>
                      <p className="text-[#4B5563]">+44 121 555 0123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-6 w-6 text-[#F3E8D2] mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-[#1F2937]">Email Us</h4>
                      <p className="text-[#4B5563]">info@elbihomes.co.uk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1F2937] text-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Elbi Homes</h3>
              <p className="text-gray-300 mb-4">
                Premium real estate solutions in Birmingham, England. Your trusted partner in finding the perfect home.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="text-gray-300 hover:text-[#F3E8D2] transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>123 High Street, Birmingham, B1 1AA</p>
                <p>Phone: +44 121 555 0123</p>
                <p>Email: info@elbihomes.co.uk</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 Elbi Homes. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
