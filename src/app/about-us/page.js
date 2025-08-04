"use client";
import React, { useEffect } from 'react';
// For animations, we'll include AOS via CDN in the RootLayout,
// so no direct import is needed here.
// For icons, we'll use inline SVGs to avoid external dependencies.
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function AboutUs() {
    // This component relies on AOS being initialized in the RootLayout.
    // No direct AOS initialization is needed here.

    return (
        // Main container with a dark background matching the overall theme
        <div className="bg-gray-950 text-gray-100 min-h-screen py-20 px-8">
            {/* NEW: Hero Section with updated theme and styling */}
            <section className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto text-center mb-20 animate-fade-in-up transition-all duration-700 border border-gray-800">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                    We Build, You Grow
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-300">
                    IDEAZ delivers visual experiences and robust digital solutions—shaping ideas into inspiring business realities.
                </p>
                <a href="/services" className="inline-block px-10 py-3 bg-cyan-500 text-gray-950 text-lg font-bold rounded-full shadow-lg hover:bg-cyan-400 transition-all transform hover:scale-105 animate-bounce-slow">
                    Explore Our Services
                </a>
            </section>

            {/* About Us Hero Section (Original content, moved below the new hero) */}
  <section className=" mx-auto px-6 max-w-7xl mb-20 " data-aos="fade-up">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content Column */}
                    <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right" data-aos-delay="100">
                        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                            About IDEAZ
                        </h1>
                        <p className="text-lg leading-relaxed text-gray-300 mb-4">
                            At IDEAZ, we are passionate about transforming ideas into reality. Our team of digital experts
                            specializes in crafting innovative solutions that empower businesses to thrive in the digital landscape.
                            From stunning web designs to robust development and strategic marketing, we are dedicated to
                            delivering excellence in every project.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-300 mt-4">
                            With a commitment to creativity and quality, we collaborate closely with our clients to understand
                            their unique needs and goals. Our mission is to build lasting partnerships that drive success and
                            inspire growth.
                        </p>
                    </div>

                    {/* Lottie Animation Column */}
                    <div className="lg:w-1/2 flex justify-center items-center" data-aos="zoom-in" data-aos-delay="300">
                        <DotLottieReact
                            src="https://lottie.host/ed0fe001-8c53-4cdd-9d2e-7f19086f80c5/QOx9XOeKTO.lottie"
                            loop
                            autoplay
                            className="w-full h-full max-w-md lg:max-w-full rounded-lg shadow-xl"
                        />
                    </div>
                </div>
                {/* Get a Quote button, now centered below the two columns */}
                <div className="text-center mt-10">
                    <a 
                        href="/get-quote" 
                        className="inline-block bg-cyan-500 text-gray-900 rounded-full px-8 py-3 font-bold shadow-lg hover:bg-cyan-400 transition-all transform hover:scale-105"
                        data-aos="zoom-in" data-aos-delay="200"
                    >
                        Get a Quote
                    </a>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="container mx-auto max-w-7xl mb-20">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                        What We Do for Our Clients
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto text-gray-400">
                        We partner with businesses of all sizes to deliver tailored digital solutions that drive real results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Service Item 1: Strategic Planning */}
                    <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
                        <div className="text-cyan-400 mb-6 text-5xl">
                            {/* SVG for Strategy */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 6c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M10.2 6.2L5 11l-3 3v2h2l3-3L8.8 9.8"/><path d="M13.8 6.2L19 11l3 3v2h-2l-3-3L15.2 9.8"/></svg>
                        </div>
                        <h3 className="font-bold text-2xl mb-3 text-cyan-300">Strategic Planning</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We start by understanding your business goals, target audience, and competitive landscape to craft a winning digital strategy.
                        </p>
                    </div>

                    {/* Service Item 2: Custom Development */}
                    <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
                        <div className="text-cyan-400 mb-6 text-5xl">
                            {/* SVG for Code */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        </div>
                        <h3 className="font-bold text-2xl mb-3 text-cyan-300">Custom Development</h3>
                        <p className="text-gray-400 leading-relaxed">
                            From bespoke web applications to robust e-commerce platforms, we build scalable and secure digital solutions tailored to your needs.
                        </p>
                    </div>

                    {/* Service Item 3: Engaging Design */}
                    <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="300">
                        <div className="text-cyan-400 mb-6 text-5xl">
                            {/* SVG for Design */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brush"><path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.07 8.07zm-1.76 1.76l-1.76 1.76a2.85 2.85 0 0 1-4.03-4.03l1.76-1.76z"/></svg>
                        </div>
                        <h3 className="font-bold text-2xl mb-3 text-cyan-300">Engaging Design</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Our designers create intuitive and visually appealing interfaces that capture your brand's essence and enhance user experience.
                        </p>
                    </div>

                    {/* Service Item 4: Digital Marketing & SEO */}
                    <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="400">
                        <div className="text-cyan-400 mb-6 text-5xl">
                            {/* SVG for Marketing */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>
                        </div>
                        <h3 className="font-bold text-2xl mb-3 text-cyan-300">Digital Marketing & SEO</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We boost your online visibility and drive traffic with data-driven SEO, social media marketing, and targeted ad campaigns.
                        </p>
                    </div>

                    {/* Service Item 5: Branding & Identity */}
                    <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="500">
                        <div className="text-cyan-400 mb-6 text-5xl">
                            {/* SVG for Branding */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="7"/><polyline points="12 15 12 22"/><polyline points="17 20 12 15 7 20"/></svg>
                        </div>
                        <h3 className="font-bold text-2xl mb-3 text-cyan-300">Branding & Identity</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We craft compelling brand stories and visual identities that resonate with your audience and leave a lasting impression.
                        </p>
                    </div>

                    {/* Service Item 6: Ongoing Support */}
                    <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="600">
                        <div className="text-cyan-400 mb-6 text-5xl">
                            {/* SVG for Support */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-life-buoy"><circle cx="12" cy="12" r="10"/><path d="M10 16.5l2-3 2 3"/><path d="M12 22V19"/><path d="M12 5V2"/><path d="M22 12h-3"/><path d="M5 12H2"/></svg>
                        </div>
                        <h3 className="font-bold text-2xl mb-3 text-cyan-300">Ongoing Support</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Our partnership doesn't end at launch. We provide continuous support, maintenance, and optimization to ensure your digital assets perform.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Team Section (Placeholder) */}
            {/* <section className="container mx-auto max-w-7xl text-center mb-20" data-aos="fade-up">
                <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                    Meet Our Talented Team
                </h2>
                <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-400 mb-12">
                    Behind every successful project is a dedicated team. Get to know the passionate individuals who make IDEAZ thrive.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
                        <img src="https://placehold.co/150x150/2563eb/ffffff?text=Team+Member" alt="Team Member" className="rounded-full mx-auto mb-4 w-32 h-32 object-cover border-4 border-cyan-500"/>
                        <h3 className="font-bold text-xl text-cyan-300 mb-1">John Doe</h3>
                        <p className="text-gray-500 mb-3">Lead Developer</p>
                        <p className="text-gray-400 text-sm">Passionate about crafting robust and scalable web solutions.</p>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
                        <img src="https://placehold.co/150x150/2563eb/ffffff?text=Team+Member" alt="Team Member" className="rounded-full mx-auto mb-4 w-32 h-32 object-cover border-4 border-cyan-500"/>
                        <h3 className="font-bold text-xl text-cyan-300 mb-1">Jane Smith</h3>
                        <p className="text-gray-500 mb-3">Creative Director</p>
                        <p className="text-gray-400 text-sm">Bringing visions to life with innovative and user-centric designs.</p>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="300">
                        <img src="https://placehold.co/150x150/2563eb/ffffff?text=Team+Member" alt="Team Member" className="rounded-full mx-auto mb-4 w-32 h-32 object-cover border-4 border-cyan-500"/>
                        <h3 className="font-bold text-xl text-cyan-300 mb-1">Emily White</h3>
                        <p className="text-gray-500 mb-3">Marketing Strategist</p>
                        <p className="text-gray-400 text-sm">Driving growth and engagement through effective digital campaigns.</p>
                    </div>
                </div>
            </section> */}

            {/* Call to Action Section */}
            <section className="container mx-auto max-w-5xl text-center bg-gray-900 rounded-xl p-12 shadow-2xl border border-gray-800" data-aos="fade-in" data-aos-delay="200">
                <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                    Ready to Start Your Project?
                </h2>
                <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-300 mb-8">
                    Let's collaborate and bring your digital ideas to life. Contact us today for a free consultation.
                </p>
                <a 
                    href="/contact-us" 
                    className="inline-block bg-cyan-500 text-gray-900 rounded-full px-8 py-3 font-bold shadow-lg hover:bg-cyan-400 transition-all transform hover:scale-105"
                >
                    Contact Us Now
                </a>
            </section>
        </div>
    );
}
