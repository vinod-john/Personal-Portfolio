import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MyPersonalWorks = () => {
  const projects = [
    {
      title: "Chat Application",
      description:
        "A real-time chat app built with Java Spring Boot, MySQL, and React (Vite). Implements WebSocket for live messaging and JWT for authentication.",
      link: "#",
    },
    {
      title: "Cricket Info App",
      description:
        "A live cricket stats app built with Java Spring Boot, MySQL, and Angular. Shows live matches, player stats, and team analytics.",
      link: "#",
    },
    {
      title: "Expense Tracker",
      description:
        "Track expenses with live charts using Java Spring Boot, MySQL, React (Vite), and Tailwind CSS. JWT-based authentication included.",
      link: "#",
    },
  ];

  const [headerAnimation, setHeaderAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderAnimation(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen py-24 px-4 relative bg-transparent text-white z-10 overflow-hidden">
      {/* Soft glowing background gradient layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 blur-[120px] -top-20 -left-20 z-0" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Header with zero-gravity hover animation */}
        <motion.h2
          className={`text-4xl sm:text-5xl font-extrabold text-cyan-400 mb-16 drop-shadow-[0_0_25px_#00ffffaa] ${
            headerAnimation ? "header-enter" : ""
          } hover:zero-gravity`}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          My Personal Works
        </motion.h2>
        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="backdrop-blur-xl bg-black/40 border border-cyan-500/30 p-6 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_25px_#00ffffaa] hover:bg-black/50 hover:zero-gravity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 * i }}
              whileHover={{ rotate: 1 }}
            >
              <h3 className="text-2xl font-semibold text-cyan-300 mb-3 drop-shadow-[0_0_10px_#00ffffaa]">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <a
                href={project.link}
                className="text-cyan-400 underline hover:text-cyan-200 transition-colors"
              >
                Explore Project →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        ></motion.div>
      </div>
    </section>
  );
};

export default MyPersonalWorks;
