import React from "react";

// You can replace these with real brand SVG URLs or local assets
const brands = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg",
  },
  {
    name: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
];

const PartnerBrands = () => {
  // We double the array to create a seamless infinite loop effect
  const doubledBrands = [...brands, ...brands];

  return (
    <section className="py-16   dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.3em]   dark:text-slate-500 mb-12">
          Powering Contests For Global Leaders
        </h2>

        {/* Logo Wrapper */}
        <div className="relative flex overflow-hidden group">
          {/* First Row of Logos */}
          <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
            {doubledBrands.map((brand, index) => (
              <div
                key={index}
                className="shrink-0 flex items-center justify-center w-32 md:w-40 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain dark:invert dark:brightness-200"
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlays for Fade Effect */}
          <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-linear-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-linear-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          /* Pause animation on hover to allow users to look closer */
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        `,
        }}
      />
    </section>
  );
};

export default PartnerBrands;
