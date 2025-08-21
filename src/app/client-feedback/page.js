"use client";
import React, { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

export default function ClientFeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    testimonial: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "testimonials"), form);
      setSubmitted(true);
    } catch (error) {
      alert("Error submitting testimonial. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-lg w-full border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
          Submit Your Testimonial
        </h2>
        {submitted ? (
          <div className="text-cyan-400 text-lg font-semibold text-center">
            Thank you for your feedback!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="company">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                id="company"
                required
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="testimonial">
                Your Testimonial
              </label>
              <textarea
                name="testimonial"
                id="testimonial"
                required
                rows={4}
                value={form.testimonial}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email (for verification)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:border-cyan-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-400 text-gray-900 font-bold rounded-full hover:bg-cyan-300 transition-colors"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Testimonial"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}