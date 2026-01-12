import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Search, X, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
 

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const images = [
  "https://i.ibb.co/N2MZscvq/designer.jpg",
  "https://i.ibb.co/FqqrYHRc/grup.jpg",
  "https://i.ibb.co/G4tg1zZ0/lab.jpg",
  "https://i.ibb.co/wNzY84Df/photographer.jpg",
  "https://i.ibb.co/qFrsWSyv/hackathon-team-names.webp",
];

const categories = ["Coding", "Design", "Writing", "Gaming", "Business"];

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // 1. Fetch search results
  const { data: results = [], isLoading } = useQuery({
    queryKey: ["searchContests", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];
      const res = await axiosSecure.get(
        `/contests-search?search=${searchTerm}`
      );
      return res.data;
    },
    enabled: isModalOpen && searchTerm.length > 0,
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) setIsModalOpen(true);
  };

  const handleCategoryClick = (cat) => {
    setSearchTerm(cat);
    setIsModalOpen(true);
  };

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-black">
      {/* Swiper Slider Background */}
      <Swiper
        spaceBetween={0}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-full h-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt="slide"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50  bg-linear-to-t from-indigo-500 via-transparent to-purple/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Main Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-xs md:text-sm font-medium">
            Over 1,000+ Contests Live Now
          </span>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
        >
          Find Your Perfect {' '}
          <span className="">
            Contest
          </span>{" "}
        </motion.h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl relative group mb-8"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for coding, design, or writing..."
            className="w-full px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-xl outline-none focus:bg-white focus:text-gray-900 transition-all shadow-2xl"
          />
          <button
            type="submit"
            className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Search className="w-6 h-6 text-white" />
          </button>
        </form>

        {/* Quick Categories */}
        <div className="flex flex-wrap justify-center gap-3 max-w-xl">
          <span className="text-sm text-gray-400 w-full mb-1">Popular:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all text-sm font-medium"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH RESULTS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                    Search Results
                  </h2>
                  <p className="text-sm text-gray-500 font-medium">
                    Results for "{searchTerm}"
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Results Scroll Area */}
              <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {isLoading ? (
                  <div className="py-20 text-center">
                    <span className="loading loading-spinner loading-lg text-indigo-600"></span>
                  </div>
                ) : results.length > 0 ? (
                  results.map((contest) => (
                    <Link
                      to={`/contest-details/${contest._id}`}
                      key={contest._id}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 transition-all group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-md">
                        <img
                          src={contest.image}
                          alt={contest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-indigo-700">
                          {contest.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-400 uppercase tracking-wider">
                            {contest.contestType}
                          </span>
                          <span className="text-sm text-amber-600 font-bold flex items-center gap-1">
                            <Trophy size={14} /> ${contest.prizeMoney}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ArrowRight size={20} />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <Search size={60} className="mx-auto mb-4 text-gray-200" />
                    <h3 className="text-xl font-bold text-gray-800">
                      No contests found
                    </h3>
                    <p className="text-gray-500">
                      Try a different keyword or category.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Banner;
