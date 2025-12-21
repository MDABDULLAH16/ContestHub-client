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
} from "lucide-react";

const WhyContestHub = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="bg-base-100">
      {/* ================= HERO SECTION ================= */}
      <section className="py-20 bg-linear-to-br from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            data-aos="fade-up"
          >
            Why<span  className="font-bold"> ContestHub</span>?
          </h1>
          <p
            className="max-w-3xl mx-auto text-lg opacity-90"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            ContestHub is a modern contest management platform built to ensure
            fairness, creativity, and transparency — empowering creators,
            participants, and admins in one powerful ecosystem.
          </p>
        </div>
      </section>

      {/* ================= PROBLEM & SOLUTION ================= */}
      <section className="py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-4">
              The Problem with Traditional Contest Platforms
            </h2>
            <ul className="space-y-3 text-base-content/80">
              <li>❌ Lack of transparency in judging</li>
              <li>❌ Poor user experience & outdated UI</li>
              <li>❌ Unclear rules & unfair participation</li>
              <li>❌ No role-based management</li>
            </ul>
          </div>

          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              How ContestHub Solves It
            </h2>
            <ul className="space-y-3 text-base-content/80">
              <li>✅ Clear rules, scoring & leaderboards</li>
              <li>✅ Modern UI with smooth animations</li>
              <li>✅ Secure payments & authentication</li>
              <li>✅ Dedicated dashboards for every role</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= ROLE BASED BENEFITS ================= */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            Built for Every Role
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ADMIN */}
            <div className="card bg-base-100 shadow-xl" data-aos="zoom-in">
              <div className="card-body">
                <UserCog className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold">Admin</h3>
                <ul className="space-y-2 text-sm text-base-content/80">
                  <li>• Full platform control</li>
                  <li>• Contest approval & moderation</li>
                  <li>• User & payment management</li>
                  <li>• Platform analytics</li>
                </ul>
              </div>
            </div>

            {/* CREATOR */}
            <div
              className="card bg-base-100 shadow-xl"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <div className="card-body">
                <Crown className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-xl font-semibold">Contest Creator</h3>
                <ul className="space-y-2 text-sm text-base-content/80">
                  <li>• Create & manage contests</li>
                  <li>• Define rules & prizes</li>
                  <li>• Earn from registrations</li>
                  <li>• Real-time submissions tracking</li>
                </ul>
              </div>
            </div>

            {/* USER */}
            <div
              className="card bg-base-100 shadow-xl"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="card-body">
                <Users className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold">Participant</h3>
                <ul className="space-y-2 text-sm text-base-content/80">
                  <li>• Join creative contests</li>
                  <li>• Secure registration payment</li>
                  <li>• Live leaderboard ranking</li>
                  <li>• Fair judging system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            Powerful Features
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Live Leaderboards",
                text: "Real-time ranking updates ensure full transparency.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Authentication",
                text: "Role-based access with protected routes.",
              },
              {
                icon: Wallet,
                title: "Payment Integration",
                text: "Safe & smooth contest registration payments.",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                text: "Track contest performance and engagement.",
              },
              {
                icon: Sparkles,
                title: "Modern UI/UX",
                text: "Clean design with animations for better experience.",
              },
              {
                icon: CheckCircle,
                title: "Fair Play System",
                text: "Transparent rules and judging process.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-md"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="card-body items-center text-center">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-base-content/70">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-primary text-primary-content text-center">
        <div className="container mx-auto px-6" data-aos="zoom-in">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Compete or Create?
          </h2>
          <p className="max-w-xl mx-auto mb-6 opacity-90">
            Join ContestHub today and become part of a transparent, creative,
            and competitive community.
          </p>
          <button className="btn btn-secondary btn-lg">Explore Contests</button>
        </div>
      </section>
    </div>
  );
};

export default WhyContestHub;
