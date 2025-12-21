import React, { useEffect } from "react";
import {
  FaUsers,
  FaBullseye,
  FaHandshake,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaAward,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";
import abdullahImage from "/abdullah.png";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleJoin = () => {
    window.location.href = "/contests";
  };

  const handleContact = () => {
    window.open(
      "https://mail.google.com/mail/u/0/?compose=GTvVlcSDXXxnRqkDLZTLlgNTGDVFWRhdzmPfwdBhGpjndNjmXzvmPLSBdwXMxMRxTlNPbgnNqdmhR"
    );
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-x-hidden transition-colors duration-500">
      {/* --- HERO SECTION: Adjusted for Mobile Viewport --- */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4">
        <div className="absolute top-0 -left-10 w-64 h-64 md:w-96 md:h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 -right-10 w-64 h-64 md:w-96 md:h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-20 animate-pulse delay-700"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs md:text-sm font-black mb-6 backdrop-blur-md uppercase tracking-widest">
              <FaAward className="text-purple-500" /> Discover the Hub
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400">
                <Typewriter
                  words={["Innovators", "Creators", "Winners"]}
                  loop={0}
                  cursor
                />
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium opacity-80">
              A premium digital arena where your skills find their true value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MISSION & VISION: Responsive Grid --- */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <div className="relative group" data-aos="fade-up">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative h-full bg-base-100 dark:bg-slate-900 border border-base-300 dark:border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-center">
              <div className="w-14 h-14 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20">
                <FaBullseye size={28} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                The Mission
              </h3>
              <p className="text-lg text-base-content/60 leading-relaxed">
                Democratizing opportunities by building a bridge where{" "}
                <span className="text-indigo-500 font-black">Raw Talent</span>{" "}
                meets impact.
              </p>
            </div>
          </div>

          <div
            className="p-8 md:p-12 rounded-3xl bg-base-200 dark:bg-slate-900/40 border border-base-300 dark:border-white/5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
              A Global Stage.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-base-100 dark:bg-slate-800 rounded-2xl border-b-4 border-indigo-500 shadow-xl shadow-indigo-500/5">
                <span className="text-[10px] opacity-40 uppercase font-black tracking-widest block mb-1">
                  Countries
                </span>
                <span className="text-3xl font-black text-indigo-500">15+</span>
              </div>
              <div className="p-6 bg-base-100 dark:bg-slate-800 rounded-2xl border-b-4 border-purple-500 shadow-xl shadow-purple-500/5">
                <span className="text-[10px] opacity-40 uppercase font-black tracking-widest block mb-1">
                  Winners
                </span>
                <span className="text-3xl font-black text-purple-500">
                  2.5k
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOUNDER SPOTLIGHT: Mobile Stack, Desktop Side-by-Side --- */}
      <section className="py-16 md:py-24 bg-base-200/50 dark:bg-slate-950 border-y border-base-300 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="relative shrink-0" data-aos="zoom-in">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 p-3 bg-base-100 dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <img
                  src={abdullahImage}
                  className="rounded-2xl object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  alt="MD Abdullah"
                />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left" data-aos="fade-up">
              <span className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                Founder & Architect
              </span>
              <h2 className="text-5xl md:text-6xl font-black mt-4 tracking-tighter">
                MD Abdullah
              </h2>
              <div className="h-1.5 w-20 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full mt-4 mx-auto lg:mx-0"></div>
              <p className="text-xl md:text-2xl mt-6 leading-relaxed text-base-content/70 italic font-medium">
                "ContestHub fusion of my passion for the{" "}
                <span className="text-indigo-500 font-black not-italic underline">
                  MERN stack
                </span>{" "}
                and my vision for meritocracy."
              </p>
              <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                {[
                  { icon: FaGithub, link: "https://github.com/MDABDULLAH16" },
                  {
                    icon: FaLinkedin,
                    link: "https://www.linkedin.com/in/ars-abdullah",
                  },
                  { icon: FaEnvelope, link: "mailto:abc@gmail.com" },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.link}
                    className="w-12 h-12 rounded-xl border border-base-300 dark:border-white/10 flex items-center justify-center bg-base-100 dark:bg-slate-900 hover:bg-indigo-500 hover:text-white transition-all"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRINCIPLES: Responsive Card Grid --- */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
            Core Principles
          </h2>
          <p className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">
            Our North Star
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Honesty",
              icon: <FaHandshake />,
              grad: "from-indigo-500 to-indigo-700",
              desc: "Transparent judging logic for every contest.",
            },
            {
              title: "Growth",
              icon: <FaUsers />,
              grad: "from-purple-500 to-purple-700",
              desc: "Pushing limits within a creative community.",
            },
            {
              title: "Global Stage",
              icon: <FaGlobe />,
              grad: "from-indigo-600 to-purple-600",
              desc: "Bangladesh talent on a world arena.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="card bg-base-200 dark:bg-slate-900 border border-base-300 dark:border-white/5 rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <div className={`h-1.5 w-full bg-linear-to-r ${v.grad}`}></div>
              <div className="card-body p-8">
                <div className="text-4xl mb-4 text-indigo-500">{v.icon}</div>
                <h3 className="text-xl font-black mb-2 uppercase">{v.title}</h3>
                <p className="text-sm text-base-content/50 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA: Fixed Scale for Mobile --- */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-linear-to-br from-indigo-600 to-purple-700 p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              Ready to win?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleJoin}
                className="btn btn-md md:btn-lg bg-white text-indigo-700 border-none rounded-xl px-10 font-black shadow-xl hover:scale-105"
              >
                Join Hub
              </button>
              <button
                onClick={handleContact}
                className="btn btn-md md:btn-lg btn-outline border-white/30 text-white rounded-xl px-10 font-black"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
