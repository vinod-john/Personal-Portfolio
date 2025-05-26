"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AboutSection from "./AboutSection";
import MyPersonalWorks from "./MyPersonalWorks";
import ContactPage from "./ContactPage";

// Floating letter animation logic (Shooting Star effect)
const FloatingLetter = ({
  char,
  index,
  setPosition,
  allPositionsRef,
  reposition,
}) => {
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prevX = useRef(0);
  const prevY = useRef(0);

  const springX = useSpring(x, { stiffness: 300, damping: 50 });
  const springY = useSpring(y, { stiffness: 300, damping: 50 });

  // Update positions in reference on every movement
  useEffect(() => {
    if (!allPositionsRef.current) allPositionsRef.current = [];
    allPositionsRef.current[index] = { x: x.get(), y: y.get() };
  }, [x, y, index, allPositionsRef]);

  // Handle letter collisions (simple effect to avoid overlap)
  useEffect(() => {
    const handleCollisions = () => {
      if (!allPositionsRef.current) return;
      allPositionsRef.current.forEach((pos, idx) => {
        if (idx === index) return;
        const distX = x.get() - pos.x;
        const distY = y.get() - pos.y;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);
        if (distance < 50) {
          const force = Math.min(50 / distance, 10);
          x.set(prevX.current + distX * force);
          y.set(prevY.current + distY * force);
        }
      });
    };
    handleCollisions();
  }, [x, y, index, allPositionsRef]);

  const handleDragEnd = (_, info) => {
    setDragging(false);
    setPosition(index, info.point.x, info.point.y);
    prevX.current = info.point.x;
    prevY.current = info.point.y;
  };

  return (
    <motion.span
      className="inline-block mx-[1px] text-white cursor-grab active:cursor-grabbing neon-text"
      style={{
        x: springX,
        y: springY,
      }}
      drag
      dragElastic={0.9}
      dragMomentum={true}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      animate={{
        x: reposition ? Math.random() * 100 - 50 : 0, // Random x repositioning for dynamic effect
        y: reposition ? Math.random() * 50 - 25 : 0, // Random y repositioning
        opacity: 1,
        transition: { duration: 0.5, delay: 0.2 * index },
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const HeroSection = () => {
  const name = "Vinod Darvemula"; // Name for hero section
  const roles = [
    "Java Developer",
    "Full Stack Engineer",
    "Spring Boot Specialist",
    "React Enthusiast",
  ];

  const [index, setIndex] = useState(0);
  const [positions, setPositions] = useState({});
  const allPositionsRef = useRef([]);
  const [reposition, setReposition] = useState(false);

  // Position management function
  const setPosition = (index, x, y) => {
    setPositions((prev) => ({ ...prev, [index]: { x, y } }));
    allPositionsRef.current[index] = { x, y };
  };

  // Reposition letters every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setReposition(true);
      setTimeout(() => {
        setReposition(false);
      }, 2000); // Reset the reposition effect after 2 seconds
    }, 5000); // Reposition every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Cycle through roles every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Shooting Stars Animation
  const createShootingStar = () => {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    document.body.appendChild(star);

    const randomX = Math.random() * window.innerWidth;
    const randomDelay = Math.random() * 2;

    star.style.left = `${randomX}px`;
    star.style.animationDelay = `${randomDelay}s`;
    setTimeout(() => {
      star.remove();
    }, 2000); // Remove the star after it finishes animating
  };

  useEffect(() => {
    const shootingStarInterval = setInterval(createShootingStar, 500);

    return () => clearInterval(shootingStarInterval);
  }, []);

  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Global Background for Shooting Stars and Glowing Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-cyan-400/20 blur-[120px] rounded-full top-10 left-1/4 animate-[blob_8s_infinite]" />
        <div className="absolute w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full bottom-20 right-1/4 animate-[blob2_10s_infinite]" />
        <div className="absolute w-80 h-80 bg-gray-900/30 blur-[140px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[pulse_12s_infinite]" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-32 px-4">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold neon-hover"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hey, I'm{" "}
            <span className="inline-flex flex-wrap justify-center">
              {name.split("").map((char, i) => (
                <FloatingLetter
                  key={i}
                  index={i}
                  char={char}
                  setPosition={setPosition}
                  allPositionsRef={allPositionsRef}
                  reposition={reposition}
                />
              ))}
            </span>
          </motion.h1>

          <motion.h2
            key={roles[index]}
            className="text-xl md:text-3xl mt-4 h-10 font-mono text-cyan-400 tracking-wide neon-hover"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {roles[index]}
          </motion.h2>

          <motion.p
            className="mt-6 max-w-xl text-gray-400 text-xl font-medium leading-relaxed tracking-wide neon-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            I build high-performance Java REST APIs and modern full-stack apps
            using <span className="text-cyan-400 font-bold">Spring Boot</span>,{" "}
            <span className="text-cyan-400 font-bold">React</span>, and{" "}
            <span className="text-cyan-400 font-bold">Tailwind CSS</span> for
            modern web development.
          </motion.p>

          <motion.a
            href="#projects"
            className="mt-8 px-6 py-3 bg-cyan-500 text-white rounded-full font-semibold neon-line-hover transition shadow-lg hover:shadow-cyan-500/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            See My Projects
          </motion.a>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Personal Works Section */}
        <MyPersonalWorks className="mt-16" />

        {/* Contact Page Section */}
        <ContactPage className="mt-16" />
      </div>
    </div>
  );
};

export default HeroSection;
