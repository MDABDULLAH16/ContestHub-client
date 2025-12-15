import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const images = [
  "https://i.ibb.co/N2MZscvq/designer.jpg",
  "https://i.ibb.co/FqqrYHRc/grup.jpg",
  "https://i.ibb.co/G4tg1zZ0/lab.jpg",
  "https://i.ibb.co/wNzY84Df/photographer.jpg",
  "https://i.ibb.co/qFrsWSyv/hackathon-team-names.webp",
];

const Banner = () => {
  return (
    <div className="relative w-full h-[50vh] my-6 md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Swiper Slider */}
      <Swiper
        spaceBetween={0}
        effect="fade"
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-full  "
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt="banner slide"
              loading="lazy"
              className="w-full  object-fill  h-full  "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Heading */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-xl"
        >
          Find Your Perfect Contest
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-lg md:text-xl mb-6 opacity-90"
        >
          Search by contest types, categories, or keywords
        </motion.p>

        {/* Search Bar */}
        <form className="w-full max-w-xl mx-auto flex bg-white/20 backdrop-blur-lg rounded-full shadow-2xl overflow-hidden border border-white/20 z-50">
          <input
            type="text"
            placeholder="Search contest types..."
            className="flex-1 px-5 py-3 text-gray-800 focus:outline-none"
          />
          <button className="px-5 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
