"use client";
import React, { useEffect } from 'react';
import { Gem, Rocket, Palette, LineChart, Quote } from 'lucide-react'; // Import professional icons
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function Services() {
  // Use a useEffect hook to dynamically add the AOS library and its CSS
  useEffect(() => {
    // Check if AOS script is already present to avoid multiple loads
    const aosScriptId = 'aos-script';
    if (!document.getElementById(aosScriptId)) {
      // Create and append the AOS CSS
      const aosLink = document.createElement('link');
      aosLink.rel = 'stylesheet';
      aosLink.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
      document.head.appendChild(aosLink);

      // Create and append the AOS JavaScript
      const aosScript = document.createElement('script');
      aosScript.id = aosScriptId;
      aosScript.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
      aosScript.onload = () => {
        // Initialize AOS after the script has loaded
        if (window.AOS) {
          window.AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
          });
        }
      };
      document.body.appendChild(aosScript);
    }
  }, []);

  return (
    // Main container with a dark background and a sans-serif font
    <div className="bg-gray-950 text-gray-100 font-inter min-h-screen">
      
      {/* --- About Us Section --- */}
      <section
        id="about-us"
        className="py-20 bg-gray-900 border-b-2 border-gray-800"
      >
        <div className="container mx-auto px-6 max-w-7xl" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="lg:w-1/2" data-aos="fade-right" data-aos-delay="200">
              <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                About IDEAZ
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-300">
                IDEAZ is a creative digital agency based in Coimbatore, specializing
                in web development, design, digital marketing, and branding. We transform
                your ideas into powerful business solutions through creativity, technology,
                and strategic insight.
              </p>
              <ul className="list-none space-y-4 text-gray-400">
                <li className="flex items-start gap-2">
                  <Rocket className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                  <span>Modern, scalable web and mobile solutions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Gem className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                  <span>Rich expertise in user experience & cutting-edge technologies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <LineChart className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                  <span>Proven track record with businesses of all sizes.</span>
                </li>
              </ul>
            </div>
            
            {/* Placeholder Image/Illustration */}
            <div
              className="lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl"
              data-aos="zoom-in"
              data-aos-delay="400"
              aria-label="Creative workspace illustration"
            >
              <div className="w-full h-80 bg-gradient-to-br from-cyan-800 to-indigo-900 animate-pulse-slow">
                <DotLottieReact
      src="https://lottie.host/267284f2-bb27-4ec2-a537-17fac3da5dcc/sTEuYA7l4o.lottie"
      loop
      autoplay
    />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-20 bg-gray-950">
        <div className="container mx-auto px-6 max-w-7xl" data-aos="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-4">
              Our Services
            </h2>
            <p className="text-gray-400 text-lg">
              Empowering businesses with technology, creativity, and innovation to
              thrive in the digital age.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Service Card 1 */}
            <article
              className="group p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="mb-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                <Palette size={56} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-2xl mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
                Web Design & Development
              </h4>
              <p className="text-gray-400 leading-relaxed">
                Creating seamless, visually stunning, and responsive websites that deliver
                exceptional user experiences and turn your vision into reality.
              </p>
            </article>
            
            {/* Service Card 2 */}
            <article
              className="group p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="mb-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                <LineChart size={56} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-2xl mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
                Digital Marketing
              </h4>
              <p className="text-gray-400 leading-relaxed">
                From SEO to social campaigns, we ensure your brand reaches the right audience
                and drives measurable business growth.
              </p>
            </article>
            
            {/* Service Card 3 */}
            <article
              className="group p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-800 hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="mb-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                <Gem size={56} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-2xl mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
                Branding & Graphic Design
              </h4>
              <p className="text-gray-400 leading-relaxed">
                Building memorable brands and visually striking assets to set your business
                apart in a crowded digital world.
              </p>
            </article>
            
          </div>
        </div>
      </section>
      
      {/* --- Testimonials Section --- */}
      <section id="testimonials" className="py-20 bg-gray-900 border-t-2 border-gray-800">
        <div className="container mx-auto px-6 max-w-7xl" data-aos="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-6">
              What Our Clients Say
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto grid gap-10 lg:grid-cols-2">
            
            {/* Testimonial Card 1 */}
            <article
              className="p-8 rounded-xl shadow-lg bg-gray-950 border border-gray-800"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <Quote className="text-cyan-600 mb-4" size={48} strokeWidth={1.5} />
              <p className="mb-6 text-gray-400 text-lg italic leading-relaxed">
                “IDEAZ delivered our new website on time and exceeded our expectations—
                highly recommended!”
              </p>
              <h5 className="font-semibold text-xl text-cyan-400">
                - S. Kumar, <span className="text-gray-500 font-normal">Founder, TechWare Solutions</span>
              </h5>
            </article>
            
            {/* Testimonial Card 2 */}
            <article
              className="p-8 rounded-xl shadow-lg bg-gray-950 border border-gray-800"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <Quote className="text-cyan-600 mb-4" size={48} strokeWidth={1.5} />
              <p className="mb-6 text-gray-400 text-lg italic leading-relaxed">
                “Their digital marketing services ramped up our leads by 300% in six months!”
              </p>
              <h5 className="font-semibold text-xl text-cyan-400">
                - Priya R., <span className="text-gray-500 font-normal">Marketing Manager, HealthPlus</span>
              </h5>
            </article>
            
          </div>
        </div>
      </section>

      {/* --- Contact Call-to-Action Section --- */}
      <section
        id="contact-cta"
        className="py-20 text-center bg-gray-950"
        data-aos="fade-in"
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <h3 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            Ready to take your business online?
          </h3>
          <p className="mb-10 text-xl max-w-2xl mx-auto text-cyan-200">
            Contact us and discover how IDEAZ can help you grow.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-cyan-400 text-gray-900 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-cyan-300 transition-colors duration-300 transform hover:scale-105"
          >
            Contact Us Today
          </a>
        </div>
      </section>
      
    </div>
  );
}
