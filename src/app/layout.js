import React from "react";
// Removed imports for next/font/google, globals.css, and react-icons/fa to fix compilation errors.
// Replaced with inline SVGs and Tailwind's font-sans.
import './globals.css'; // Ensure this is still imported for global styles

export const metadata = {
  title: "IDEAZ | Innovative Solutions",
  description: "Creative digital agency specializing in web development, design, and marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html className={`font-sans bg-gray-950 antialiased text-white min-h-screen animated-bg`}>
      <body>
        {/* Header must be inside <body> */}
        <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 py-5 px-8 flex justify-between items-center animate-fade-in-down transition-all duration-300 shadow-xl border-b border-gray-800">
          <div className="font-extrabold text-2xl tracking-tight flex items-center gap-2">
            <span className="text-cyan-400">IDEAZ</span>
            <span className="text-xs font-thin text-blue-100">Digital Creativity</span>
          </div>
          <nav className="flex items-center gap-8">
            {/* Nav links with a hover-underline animation */}
            {["Home","Services","About Us","Contact Us"].map(p => (
              <a key={p}
                href={p === "Home" ? "/" : `/${p.toLowerCase().replace(/\s+/g,"-")}`}
                className="relative text-gray-300 hover:text-cyan-400 transition-colors after:content-[''] after:block after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >{p}</a>
            ))}
            <a href="/get-quote" className="ml-4 bg-cyan-500 text-gray-900 rounded-full px-5 py-2 font-bold shadow-md hover:bg-cyan-400 transition-all transform hover:scale-105">Get a Quote</a>
          </nav>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes gradientPulse {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animated-bg {
              background: radial-gradient(circle at top left, #1f2937, #111827 75%);
              background-size: 200% 200%;
              animation: gradientPulse 15s ease infinite;
            }
          `}} />
        </header>

        <main>
          {children}
        </main>

        {/* The footer has a rounded top edge, a border, and a shadow.
          'animate-fade-in-up' makes it slide in from the bottom.
        */}
        <footer className="bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 rounded-t-3xl shadow-inner py-12 px-8 mt-20 border-t border-gray-800 animate-fade-in-up">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-300">
            <div>
              <h3 className="font-bold text-lg mb-2 text-cyan-400">IDEAZ HQ</h3>
              <p>
                COIMBATORE<br/>
                <strong>Phone:</strong> <span className="text-cyan-400">8300864083</span><br/>
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
              <div className="flex gap-4 mt-3 text-2xl">
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
          <div className="mt-8 text-center border-t border-gray-800 pt-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} <strong className="text-cyan-400">IDEAZ</strong>. All Rights Reserved.<br />
            <span>Designed by Developer team</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
