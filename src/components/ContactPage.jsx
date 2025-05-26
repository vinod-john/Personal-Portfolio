"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Animated Word Effect Component
const ZeroGravityEffect = ({ text, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className="inline-block text-2xl md:text-3xl font-semibold text-white hover:text-green-400 transition-colors duration-300"
      style={{
        cursor: "pointer",
        textShadow: hovered
          ? "0 0 8px #39ff14, 0 0 15px #39ff14, 0 0 25px #39ff14"
          : "none",
        marginRight: "0.25rem",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: hovered ? -10 : 0 }}
      transition={{
        delay: 0.05 * index,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {text}
    </motion.span>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message Sent!");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-[#0f0f0f] text-white p-8 border border-green-400 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl text-center mb-6 font-bold text-green-400">
        Get in Touch
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-green-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-green-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-green-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`neon-button px-6 py-3 rounded-md text-white font-bold ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            } transition-colors duration-300`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </motion.form>
  );
};

// Main Contact Page Component
const ContactPage = () => {
  const fullText = "Have a project in mind? Let's make it real!";
  const [isTyped, setIsTyped] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsTyped(true), fullText.length * 80);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-black min-h-screen py-16 px-6 text-white">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-white mb-6">
          <span className="text-green-400">Let's</span>{" "}
          <span className="text-green-500">Communicate</span>
        </h1>
        <p className="text-2xl text-gray-400 mb-4">
          Feel free to get in touch with me
        </p>
        {/* Typing effect rendered as words only when completed */}
        <div className="mt-8 flex justify-center flex-wrap gap-2 max-w-3xl mx-auto">
          {isTyped &&
            fullText
              .split(" ")
              .map((word, index) => (
                <ZeroGravityEffect key={index} text={word} index={index} />
              ))}
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
