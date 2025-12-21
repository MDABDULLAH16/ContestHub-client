import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Trophy,
  Users,
  ShieldCheck,
  Wallet,
  BarChart3,
  Sparkles,
  UserCog,
  Crown,
  CheckCircle,
  XCircle,
} from "lucide-react";

const WhyContestHub = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="bg-base-100 transition-colors duration-500">
      {/* ================= HERO SECTION ================= */}
      <section className="py-24 bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
            data-aos="fade-up"
          >
            Why<span className=""> ContestHub</span>?
          </h1>
          <p
            className="max-w-2xl mx-auto text-lg md:text-xl opacity-90 font-medium leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            A next-generation ecosystem built to bridge the gap between
            visionary creators and elite competitors through transparency and
            innovation.
          </p>
        </div>
      </section>

      {/* ================= PROBLEM & SOLUTION ================= */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Problem Card */}
          <div
            className="p-8 rounded-[2.5rem] bg-error/5 border border-error/10"
            data-aos="fade-right"
          >
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-error">
              <XCircle className="shrink-0" /> The Old Way
            </h2>
            <ul className="space-y-4 font-bold text-base-content/70">
              <li className="flex items-start gap-2">
                ❌ Lack of transparency in judging
              </li>
              <li className="flex items-start gap-2">
                ❌ Poor user experience & outdated UI
              </li>
              <li className="flex items-start gap-2">
                ❌ Unclear rules & unfair participation
              </li>
              <li className="flex items-start gap-2">
                ❌ No role-based management
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div
            className="p-8 rounded-[2.5rem] bg-success/5 border border-success/10 shadow-2xl shadow-success/5"
            data-aos="fade-left"
          >
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-success">
              <CheckCircle className="shrink-0" /> The ContestHub Way
            </h2>
            <ul className="space-y-4 font-bold text-base-content/70">
              <li className="flex items-start gap-2">
                ✅ Clear rules, scoring & leaderboards
              </li>
              <li className="flex items-start gap-2">
                ✅ Modern UI with smooth animations
              </li>
              <li className="flex items-start gap-2">
                ✅ Secure payments & authentication
              </li>
              <li className="flex items-start gap-2">
                ✅ Dedicated dashboards for every role
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= ROLE BASED BENEFITS ================= */}
      <section className="py-24 bg-base-200/50 backdrop-blur-sm border-y border-base-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-black text-base-content mb-4"
              data-aos="fade-up"
            >
              Tailored Experiences
            </h2>
            <div className="h-1.5 w-20 bg-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ADMIN */}
            <div
              className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary/50 transition-colors"
              data-aos="zoom-in"
            >
              <div className="card-body">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <UserCog className="text-primary" />
                </div>
                <h3 className="text-2xl font-black text-base-content">Admin</h3>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-base-content/60">
                  <li className="flex items-center gap-2">
                    • Platform moderation
                  </li>
                  <li className="flex items-center gap-2">
                    • Contest approval
                  </li>
                  <li className="flex items-center gap-2">
                    • Payment management
                  </li>
                  <li className="flex items-center gap-2">• Deep analytics</li>
                </ul>
              </div>
            </div>

            {/* CREATOR */}
            <div
              className="card bg-base-100 shadow-xl border border-base-300 hover:border-secondary/50 transition-colors"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <div className="card-body">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Crown className="text-secondary" />
                </div>
                <h3 className="text-2xl font-black text-base-content">
                  Creator
                </h3>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-base-content/60">
                  <li className="flex items-center gap-2">
                    • Design challenges
                  </li>
                  <li className="flex items-center gap-2">• Set prize pools</li>
                  <li className="flex items-center gap-2">• Revenue sharing</li>
                  <li className="flex items-center gap-2">
                    • Submission tracking
                  </li>
                </ul>
              </div>
            </div>

            {/* USER */}
            <div
              className="card bg-base-100 shadow-xl border border-base-300 hover:border-accent/50 transition-colors"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="card-body">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="text-accent" />
                </div>
                <h3 className="text-2xl font-black text-base-content">
                  Participant
                </h3>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-base-content/60">
                  <li className="flex items-center gap-2">
                    • Join global arenas
                  </li>
                  <li className="flex items-center gap-2">
                    • Secure transactions
                  </li>
                  <li className="flex items-center gap-2">• Live tracking</li>
                  <li className="flex items-center gap-2">• Fair rewards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2
            className="text-4xl font-black text-center mb-16 text-base-content"
            data-aos="fade-up"
          >
            Platform Capabilities
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                icon: Trophy,
                title: "Live Updates",
                text: "Instant leaderboard shifts as scores change.",
              },
              {
                icon: ShieldCheck,
                title: "Auth Guard",
                text: "Enterprise-grade role protection.",
              },
              {
                icon: Wallet,
                title: "Easy Pay",
                text: "Integrated Stripe/Secure payment gateways.",
              },
              {
                icon: BarChart3,
                title: "Metrics",
                text: "Visualize engagement and growth stats.",
              },
              {
                icon: Sparkles,
                title: "Fluid UI",
                text: "Optimized for speed and visual delight.",
              },
              {
                icon: CheckCircle,
                title: "Integrity",
                text: "Anti-fraud and automated fair-play logic.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-2 rounded-3xl hover:bg-linear-to-b hover:from-indigo-500/5 hover:to-transparent transition-all duration-500"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="p-6 text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-base-200 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 mb-6">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-base-content mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-base-content/50">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-center overflow-hidden">
        <div className="container mx-auto px-6 relative" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Dominate?
          </h2>
          <p className="max-w-xl mx-auto mb-10 text-lg opacity-80 font-medium">
            Whether you are here to build a legacy or prove your skills, the
            arena is ready.
          </p>
          <button className="btn btn-lg rounded-2xl bg-white text-indigo-600 border-none hover:bg-indigo-50 hover:scale-105 transition-all shadow-2xl px-12 font-black">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default WhyContestHub;
