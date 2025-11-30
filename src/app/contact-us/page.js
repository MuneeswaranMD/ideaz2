"use client";
import React, { useState } from 'react';

// This is a self-contained React component for a contact page.
// It uses Tailwind CSS for styling and includes inline SVG icons.
// The form is a controlled component, managing its state with React's useState hook.
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  // State to manage the popup's visibility and content
  const [popup, setPopup] = useState({
    isVisible: false,
    message: '',
    isSuccess: false
  });

  // Handle changes to the form inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Function to show the popup
  const showPopup = (message, isSuccess) => {
    setPopup({ isVisible: true, message, isSuccess });
  };

  // Function to hide the popup
  const hidePopup = () => {
    setPopup({ isVisible: false, message: '', isSuccess: false });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        showPopup("Thank you for your message! We will get back to you shortly.", true);
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        showPopup("There was an error sending your message. Please try again later.", false);
      }
    } catch (error) {
      showPopup("There was an error sending your message. Please try again later.", false);
    }
  };

  return (
    // Main container with a subtle background and padding
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white animate-fade-in-up">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-cyan-400 animate-fade-in-down">Contact Us</h1>
      
      {/* Subheading text */}
      <p className="text-lg max-w-2xl text-center mb-12 text-gray-300 animate-fade-in">
        We would love to hear from you! Whether you have a question about our services, need assistance, or just want to say hello, our team is here to help.
      </p>

      {/* Main content area, with Info Card and Contact Form */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Info Card section */}
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-lg p-8 shadow-2xl text-cyan-300 flex-1 flex flex-col justify-center animate-slide-in-left transition-all hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Get in Touch</h2>
          
          {/* Location details */}
          <div className="flex items-start mb-3">
            <span className="mr-3 text-2xl text-cyan-400">
              {/* Inline SVG for location icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </span>
            <div>
              <h4 className="font-semibold mb-0">Location</h4>
              <p className="mb-0 text-gray-300">COIMBATORE</p>
            </div>
          </div>
          
          {/* Email details */}
          <div className="flex items-start mb-3">
            <span className="mr-3 text-2xl text-cyan-400">
              {/* Inline SVG for email icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </span>
            <div>
              <h4 className="font-semibold mb-0">Email</h4>
              <p className="mb-0 text-gray-300">hr@ideaz.org.in</p>
            </div>
          </div>
          
          {/* Phone details */}
         
        </div>
        
        {/* Contact Form section */}
        <div className="flex-1 flex flex-col justify-center animate-slide-in-right transition-all hover:scale-105">
          <form className="w-full bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-6 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-cyan-400" htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" 
                placeholder="Your full name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-cyan-400" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" 
                placeholder="your.email@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-cyan-400" htmlFor="service">Which service do you want?</label>
              <select
                id="service"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                required
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="Web Design">Web Design</option>
                <option value="Web Development">Web Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-cyan-400" htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all" 
                placeholder="Write your message here..." 
                required 
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-cyan-500 text-gray-900 font-bold py-2 rounded-lg hover:bg-cyan-400 transition-all transform hover:scale-105 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      {/* Popup/Modal component */}
      {popup.isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className={`p-8 rounded-lg shadow-2xl max-w-sm w-full text-center ${popup.isSuccess ? 'bg-green-600' : 'bg-red-600'} text-white relative animate-zoom-in`}>
            <button
              onClick={hidePopup}
              className="absolute top-2 right-2 text-gray-100 hover:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {popup.isSuccess ? 'Success!' : 'Error!'}
            </h2>
            <p className="text-lg">{popup.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}