"use client";
import React, { useState } from "react";
import './globals.css'; // Ensure this is still imported for global styles


export default function RootLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <html className="font-sans bg-gray-950 antialiased text-white min-h-screen">
      <body>
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IDEAZ</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <a href="/services" className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Get started
                </button>
              </a>
              <button
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={navOpen}
                onClick={() => setNavOpen((v) => !v)}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button>
            </div>
            <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${navOpen ? '' : 'hidden'}`} id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="/about-us" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                </li>
                <li>
                  <a href="/services" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                </li>
                <li>
                  <a href="/contact-us" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="pt-20">{children}</main>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/918300707692?text=Hello%20IDEAZ%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-4 flex items-center justify-center transition-all"
          title="Contact us on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.166-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.511-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.378.711.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.455 4.436-9.89 9.893-9.89 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.991c-.002 5.455-4.437 9.89-9.893 9.89zm8.413-18.304A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.893c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.675a11.86 11.86 0 005.741 1.463h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.484-8.463z"/>
          </svg>
        </a>

        <footer className="bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 rounded-t-3xl shadow-inner py-8 md:py-12 px-2 md:px-8 mt-10 md:mt-20 border-t border-gray-800 animate-fade-in-up">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-gray-300">
            <div>
              <h3 className="font-bold text-lg mb-2 text-cyan-400">IDEAZ HQ</h3>
              <p>
                COIMBATORE<br/>
                <strong>Phone:</strong> <span className="text-cyan-400">8300707692</span><br/>
                <strong>Email:</strong> <span className="text-cyan-400">ideazdevelop27@gmail.com</span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-cyan-300">Links</h4>
              <ul className="space-y-1">
                <li><a href="/" className="hover:underline hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="/services" className="hover:underline hover:text-cyan-400 transition-colors">Services</a></li>
                <li><a href="/terms-and-service" className="hover:underline hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:underline hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-cyan-300">Our Services</h4>
              <ul className="space-y-1">
                <li>Web Design</li>
                <li>Web Development</li>
                <li>Marketing</li>
                <li>Graphic Design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-cyan-300">Social Networks</h4>
              <div className="flex gap-4 mt-3 text-2xl flex-wrap">
                {/* Replaced react-icons with inline SVG for compatibility */}
                <a href="https://twitter.com/Ideaz272904" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-transform duration-300 hover:scale-125">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.36-.83.5-1.75.85-2.73 1.04C18.12 4.68 17.15 4 16.08 4c-2.35 0-4.27 1.9-4.27 4.26 0 .33.04.66.12.97-3.55-.18-6.7-1.89-8.81-4.48-.37.64-.58 1.39-.58 2.21 0 1.48.75 2.8 1.91 3.56-.7-.01-1.35-.22-1.92-.53v.06c0 2.07 1.47 3.8 3.42 4.2-.36.1-.73.15-1.12.15-.27 0-.53-.03-.79-.08.54 1.7 2.11 2.94 3.97 2.97C6.37 19.34 4.5 20 2.45 20c-.4 0-.79-.02-1.18-.07C2.26 21.09 4.67 22 7.21 22c8.2 0 12.7-6.8 12.7-12.7V9.7c.87-.63 1.62-1.42 2.21-2.31z"/></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61556826363017&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-transform duration-300 hover:scale-125">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/ideaz2024/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-transform duration-300 hover:scale-125">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6a1 1 0 110 2 1 1 0 010-2zm-3 8h-3a1 1 0 010-2h3zm0-4h-3a1 1 0 010-2h3zm-3-4a1 1 0 110-2 1 1 0 010 2zm6 8a1 1 0 110-2 1 1 0 010 2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/105900292/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-transform duration-300 hover:scale-125">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46c.98 0 1.77-.79 1.77-1.77V1.77C24 .79 23.21 0 22.23 0zM7.05 20.23H3.8V9.18h3.25V20.23zM5.42 7.82c-1.09 0-1.97-.88-1.97-1.97s.88-1.97 1.97-1.97 1.97.88 1.97 1.97-.88 1.97-1.97 1.97zM20.23 20.23h-3.25v-5.11c0-1.22-.02-2.8-.82-3.79-1.09-1.28-2.52-1.28-2.61-1.28-1.28 0-1.52.99-1.52 1.91v7.27h-3.25V9.18h3.12v1.44h.05c.44-.84 1.5-1.73 3.09-1.73 3.32 0 3.93 2.18 3.93 5.01v7.33z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-center border-t border-gray-800 pt-4 text-xs md:text-sm text-gray-500">
            &copy; {new Date().getFullYear()} <strong className="text-cyan-400">IDEAZ</strong>. All Rights Reserved.<br />
            <span>Designed by Developer team</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
