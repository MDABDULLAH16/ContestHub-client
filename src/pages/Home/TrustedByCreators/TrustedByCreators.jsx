import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Quote,
  Star,
  CheckCircle2,
  Trophy,
  Zap,
  ShieldCheck,
  Crown,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior UI Designer",
    image: "https://i.pravatar.cc/150?u=alex",
    text: "ContestHub changed the game for my portfolio. Winning the 'Future UI' challenge landed me my current job at a tech firm.",
    achievement: "5x Winner",
    icon: <Trophy size={12} />,
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Fullstack Developer",
    image: "https://i.pravatar.cc/150?u=sarah",
    text: "The community here is elite. The feedback from judges is professional, and the prize payouts are lightning-fast.",
    achievement: "Top 1% Rank",
    icon: <Zap size={12} />,
    color: "from-purple-600 to-indigo-600",
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Digital Artist",
    image: "https://i.pravatar.cc/150?u=marcus",
    text: "I've tried many platforms, but the dark interface and seamless submission process make it the best for creators.",
    achievement: "Platinum",
    icon: <ShieldCheck size={12} />,
    color: "from-indigo-500 to-indigo-800",
  },
];

const TrustedByCreators = () => {
  return (
    <section className="py-20   dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest   dark:text-indigo-400 mb-2 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold   dark:text-white">
            Trusted by{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Global Talent
            </span>
          </h2>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="  dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl h-full flex flex-col justify-between shadow-sm">
                <div className="mb-8">
                  <Quote
                    className="  dark:text-slate-700 mb-4"
                    size={32}
                  />
                  <p className="  dark:text-slate-300 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5     dark:border-slate-900">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="  dark:text-white font-bold text-sm">
                        {t.name}
                      </h4>
                      <p className="text-xs  dark:text-slate-400">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span
                      className={`flex items-center gap-1 text-[10px] font-bold uppercase px-3 py-1 rounded-lg bg-linear-to-r ${t.color} text-white`}
                    >
                      {t.icon} {t.achievement}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrustedByCreators;
