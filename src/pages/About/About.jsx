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
    } 
    const handleContact = () => {
        window.open(
          "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSDXXxnRqkDLZTLlgNTGDVFWRhdzmPfwdBhGpjndNjmXzvmPLSBdwXMxMRxTlNPbgnNqdmhR"
        );
    }
  return (
    <div className="min-h-screen bg-base-100 text-base-content overflow-x-hidden transition-colors duration-500">
      {/* --- HERO SECTION: INDIGO & PURPLE GRADIENT --- */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Animated Background Blobs with your Brand Colors */}
        <div className="absolute top-0 -left-10 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 -right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse delay-700"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md">
              <FaAward className="text-purple-500" /> Discover the Hub of Talent
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-500 to-indigo-400">
                <Typewriter
                  words={["Innovators", "Creators", "Visionaries", "Winners"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                />
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              ContestHub is more than a platform—it’s a digital arena where
              creativity is measured by skill and rewarded with excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: MISSION & VISION (Gradient Accents) --- */}
      <section className="py-28 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="relative group" data-aos="fade-right">
            {/* The Gradient Border Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative h-full bg-base-100 dark:bg-slate-900 border border-base-300 dark:border-slate-800 rounded-3xl p-10 flex flex-col justify-center">
              <div className="w-16 h-16 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/20">
                <FaBullseye size={32} />
              </div>
              <h3 className="text-4xl font-bold mb-6 tracking-tight">
                The Mission
              </h3>
              <p className="text-xl opacity-70 leading-relaxed font-light">
                To democratize opportunities by building a bridge where{" "}
                <span className="text-indigo-500 font-semibold uppercase text-sm tracking-widest">
                  Raw Talent
                </span>{" "}
                meets real-world rewards.
              </p>
            </div>
          </div>

          <div className="space-y-6" data-aos="fade-left">
            <div className="p-10 rounded-3xl bg-base-200 dark:bg-slate-900/50 border border-base-300 dark:border-slate-800">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">
                Global Ecosystem <br /> for Success.
              </h2>
              <p className="opacity-70 text-lg font-light mb-8 leading-relaxed">
                Whether you're a designer, writer, or dev, we provide the tools
                to prove your worth in a secure, competitive environment.
              </p>

              {/* Modern Stats using Indigo/Purple */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-base-100 dark:bg-slate-800 rounded-2xl shadow-sm border-b-4 border-indigo-500">
                  <div className="text-sm opacity-50 uppercase font-bold tracking-tighter">
                    Countries
                  </div>
                  <div className="text-4xl font-black text-indigo-500">15+</div>
                </div>
                <div className="p-6 bg-base-100 dark:bg-slate-800 rounded-2xl shadow-sm border-b-4 border-purple-500">
                  <div className="text-sm opacity-50 uppercase font-bold tracking-tighter">
                    Winners
                  </div>
                  <div className="text-4xl font-black text-purple-500">
                    2.5k
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FOUNDER SPOTLIGHT (Brand Integrated) --- */}
      <section className="py-28 bg-slate-50 dark:bg-slate-900/40 border-y border-base-300 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Image Section */}
            <div className="relative" data-aos="zoom-in">
              <div className="w-72 h-72 md:w-96 md:h-96 relative z-10 p-3 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl">
                <img
                  src={abdullahImage}
                  className="rounded-4xl object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  alt="MD Abdullah"
                />
              </div>
              {/* Abstract Gradient Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Info Section */}
            <div className="flex-1 space-y-8" data-aos="fade-up">
              <div>
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  Founder & Architect
                </span>
                <h2 className="text-5xl md:text-6xl font-black mt-4 tracking-tighter">
                  MD Abdullah
                </h2>
                <div className="h-1.5 w-20 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full mt-2"></div>
              </div>

              <p className="text-xl leading-relaxed text-base-content/70 font-light italic">
                "ContestHub represents the fusion of my passion for the{" "}
                <span className="text-indigo-500 font-semibold italic">
                  MERN stack
                </span>{" "}
                and my belief in a meritocratic digital future."
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md">
                {[
                  "Clean Code",
                  "Secure Payments",
                  "User First",
                  "Scalable Dev",
                ].map((val) => (
                  <div key={val} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="font-medium text-sm">{val}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/MDABDULLAH16"
                  className="w-12 h-12 rounded-full border border-base-300 dark:border-slate-700 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ars-abdullah"
                  className="w-12 h-12 rounded-full border border-base-300 dark:border-slate-700 flex items-center justify-center hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all"
                >
                  <FaLinkedin size={20} />
                </a>
                              <a
                                  target="_blank"
                  href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSDXXxnRqkDLZTLlgNTGDVFWRhdzmPfwdBhGpjndNjmXzvmPLSBdwXMxMRxTlNPbgnNqdmhR"
                  className="w-12 h-12 rounded-full border border-base-300 dark:border-slate-700 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: PRINCIPLES (Interactive Grid) --- */}
      <section className="py-28 container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">
            Core Principles
          </h2>
          <p className="text-indigo-500 font-bold tracking-[0.3em] uppercase text-xs">
            Our North Star
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Radical Honesty",
              icon: <FaHandshake />,
              gradient: "from-indigo-500 to-indigo-700",
              desc: "Complete transparency in judging and payouts, powered by logic.",
            },
            {
              title: "Creative Growth",
              icon: <FaUsers />,
              gradient: "from-purple-500 to-purple-700",
              desc: "A community that pushes you to exceed your own expectations.",
            },
            {
              title: "Global Reach",
              icon: <FaGlobe />,
              gradient: "from-indigo-600 to-purple-600",
              desc: "Connecting Bangladesh's talent to a worldwide stage of visionaries.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="relative p-1 rounded-3xl group bg-base-300 dark:bg-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="card bg-base-100 dark:bg-slate-900 h-full rounded-[1.4rem] overflow-hidden">
                <div
                  className={`h-2 w-full bg-linear-to-r ${v.gradient}`}
                ></div>
                <div className="card-body p-8">
                  <div
                    className={`text-4xl mb-6 bg-linear-to-r ${v.gradient} bg-clip-text text-transparent`}
                  >
                    {v.icon}
                  </div>
                  <h3 className="card-title text-2xl font-bold mb-3 tracking-tight">
                    {v.title}
                  </h3>
                  <p className="opacity-60 font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION: THE GRAND FINALE --- */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-linear-to-br from-indigo-600 to-purple-700 p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

          <div className="relative z-10" data-aos="zoom-in">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              Ready to claim <br className="hidden md:block" /> your throne?
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
                onClick={handleJoin}
                className="btn btn-lg bg-white text-indigo-700 border-none hover:bg-indigo-50 rounded-2xl px-12 font-bold shadow-xl transition-all hover:scale-105"
              >
                Join Now
              </button>
              <button
                onClick={handleContact}
                className="btn btn-lg btn-outline border-white/30 text-white hover:bg-white/10 rounded-2xl px-12 backdrop-blur-md"
              >
                Contact Abdullah <FaExternalLinkAlt className="ml-2 text-xs" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
