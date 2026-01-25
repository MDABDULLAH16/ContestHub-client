import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, Sparkles } from "lucide-react";
import Loader from "./../../../components/Loader/Loader";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const Categories = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", "accepted"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?status=accepted`);
      return res.data;
    },
  });

  const contestTypes = [...new Set(contests.map((c) => c.contestType))];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contestTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contestTypes.length / itemsPerPage);

  if (isLoading) return <Loader />;

  return (
    <section className="py-14 bg-base-100 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>Premium Categories</span>
          </motion.div>
          <h2 className="text-5xl font-black tracking-tight mb-4">
            Browse by{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Niche
            </span>
          </h2>
          <p className="max-w-xl text-base-content/60 text-lg">
            Choose a field that matches your expertise and compete with the best
            in the industry.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <AnimatePresence mode="wait">
            {currentItems.map((type, index) => (
              <motion.div
                key={type}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/contests?filter=${type}`)}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

                <div className="relative card bg-base-200/50 backdrop-blur-xl border border-base-300 hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl shadow-base-300/10">
                  <div className="card-body items-center text-center  ">
                  

                    <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                      {type}
                    </h3>
                   
                  </div>

                  {/* Bottom animated bar */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-primary to-secondary group-hover:w-full transition-all duration-700"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modern Pagination */}
        {contestTypes.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-circle btn-ghost border border-base-300 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-3 bg-base-200 p-2 rounded-full border border-base-300 shadow-inner">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 rounded-full font-black transition-all duration-500 ${
                    currentPage === i + 1
                      ? "bg-primary text-primary-content shadow-lg shadow-primary/30 rotate-12 scale-110"
                      : "hover:bg-base-300 text-base-content/60"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="btn btn-circle btn-ghost border border-base-300 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
