// NavBar.jsx
"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Infinite Typewriter Effect Component
const TypewriterEffect = ({ text, speed = 150 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingAndDeleting = setInterval(() => {
      if (isDeleting) {
        setDisplayedText((prevText) => prevText.slice(0, prevText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setIndex(0);
        }
      } else {
        if (index < text.length) {
          setDisplayedText((prevText) => prevText + text[index]);
          setIndex(index + 1);
        } else {
          setIsDeleting(true);
        }
      }
    }, speed);

    return () => clearInterval(typingAndDeleting);
  }, [isDeleting, displayedText, index, text, speed]);

  return <span>{displayedText}</span>;
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-900/80 backdrop-blur-md text-white w-full fixed top-0 z-50 shadow-cyan-500/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Typewriter Logo */}
        <motion.div
          className="text-2xl font-bold text-cyan-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{
            scale: 1.1,
            textShadow: "0 0 12px #22d3ee",
            transition: { type: "spring", stiffness: 200 },
          }}
        >
          <TypewriterEffect text="MyPortfolio" speed={150} />
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu - Empty but animated container preserved */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4"
          >
            {/* No links rendered */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
