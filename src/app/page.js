'use client';
import React from "react";
import ThreeScene from "./ThreeScene";
import Services from "./services/page";
import Contact from "./contact-us/page";
import AboutUs from "./about-us/page";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <main className="animate-fade-in-up">
        <div className="w-full flex justify-center items-center mb-8" style={{ minHeight: 250 }}>
          <ThreeScene />
        </div>
        <div className="w-full flex justify-center items-center mb-8" style={{ minHeight: 250 , marginBottom: "200px",marginTop: "-200px"}}>
        <section className="bg-blue-100/10 p-6 rounded-xl shadow-xl max-w-2xl text-center mb-8 animate-fade-in-up transition-all margin-x-auto center" >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text">We Build, You Grow</h1>
          <p className="text-lg md:text-xl mb-6 text-blue-200">
            IDEAZ delivers visual experiences and robust digital solutions—shaping ideas into inspiring business realities.
          </p>
          <a href="/services" className="inline-block px-8 py-3 bg-cyan-500 text-blue-950 text-lg font-bold rounded-full shadow hover:bg-cyan-300 transition-all animate-bounce">Explore Our Services</a>
        </section>
        </div>
        <section >
          <Services />
        </section>
         <section >
          <AboutUs />
        </section>
        <section >
          <Contact />
        </section>
       
      </main>
    </div>
  );
}
