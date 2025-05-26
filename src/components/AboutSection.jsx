import { motion } from "framer-motion";

const AboutSection = () => {
  const cards = [
    {
      icon: "⚙️",
      title: "Backend Development",
      desc: "Expertise in building RESTful APIs with Spring Boot.",
    },
    {
      icon: "💻",
      title: "Frontend Development",
      desc: "Modern UIs using React and Tailwind CSS.",
    },
    {
      icon: "📈",
      title: "Data Analytics",
      desc: "Skilled at insights and data-driven decisions.",
    },
    {
      icon: "🛠️",
      title: "DevOps",
      desc: "Experience with CI/CD and cloud infrastructure.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      className="py-24 px-6 sm:px-12 bg-transparent text-white relative z-10 overflow-hidden"
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Optional background blob effects for visual interest */}
        <div className="absolute w-96 h-96 bg-cyan-400/10 blur-[160px] rounded-full top-0 left-1/3 animate-[blob_8s_infinite]" />
        <div className="absolute w-96 h-96 bg-cyan-400/10 blur-[160px] rounded-full bottom-0 right-1/4 animate-[blob2_10s_infinite]" />
      </div>

      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center mb-8 tracking-tight text-cyan-400 drop-shadow-[0_0_15px_#00FFFF55]"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        I am a passionate developer experienced in building scalable
        applications. I specialize in robust Java REST APIs, modern web apps
        using React, and responsive UI designs with Tailwind CSS. My mission is
        to write clean, efficient code that solves real-world problems.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cards.map((item, i) => (
          <motion.div
            key={i}
            className="relative flex items-start gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-lg group hover:scale-[1.05] transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-cyan-500/30 hover:cursor-pointer"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotate: [0, -2, 2, -2, 0],
              transition: { repeat: Infinity, duration: 1.5 },
            }}
          >
            {/* Glowing Ring for Hover Effect */}
            <div className="absolute inset-0 z-0 rounded-xl group-hover:shadow-[0_0_30px_#00FFFF99] transition-all duration-500" />

            <div className="relative z-10 bg-cyan-600 text-white p-4 rounded-full text-3xl shadow-lg flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              {item.icon}
            </div>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-cyan-300 mb-2 drop-shadow-[0_0_10px_#00FFFF99]">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutSection;
