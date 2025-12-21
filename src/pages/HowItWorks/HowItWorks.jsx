import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Browse Contests",
      description:
        "Explore a wide variety of contests - design challenges, writing competitions, business ideas, and more.",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Submit Your Entry",
      description:
        "Participate by submitting your creative work. Pay the contest entry fee securely through our payment gateway.",
      icon: "📤",
    },
    {
      number: "03",
      title: "Get Judged",
      description:
        "Expert judges review all entries and select the winners based on quality and creativity.",
      icon: "⭐",
    },
    {
      number: "04",
      title: "Win Rewards",
      description:
        "Winners receive prizes, recognition, and exposure. Monetize your talent and build your portfolio.",
      icon: "🏆",
    },
  ];

  const forCreators = [
    "Create unlimited contests",
    "Set your own rules and criteria",
    "Receive detailed analytics",
    "Manage participant entries",
    "Secure payment processing",
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-500">
      {/* Header Section */}
      <div className="bg-base-200/50 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-500 hover:gap-3 transition-all font-bold mb-10 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>

          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">
              How <span className="text-indigo-500">ContestHub</span> Works
            </h1>
            <p className="text-xl text-base-content/60 max-w-2xl font-medium leading-relaxed">
              A complete platform for discovering global opportunities and
              showcasing your unique talent to the world.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-base-300 grow"></div>
          <h2 className="text-3xl font-black tracking-tight uppercase px-4">
            For Participants
          </h2>
          <div className="h-px bg-base-300 grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-base-100 rounded-2xl p-8 border border-base-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden"
            >
              {/* Background Number Watermark */}
              <div className="absolute -right-4 -bottom-4 text-9xl font-black text-base-content/5 opacity-0 group-hover:opacity-100 transition-opacity">
                {step.number}
              </div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="text-5xl shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">
                    Step {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-indigo-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-base-content/60 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* For Creators Section */}
      <div className="bg-base-200 border-y border-base-300 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-sm font-black mb-6 uppercase tracking-widest">
                <Zap size={16} fill="currentColor" /> Business Tools
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-base-content mb-8 tracking-tighter">
                For Contest Creators
              </h2>
              <p className="text-lg text-base-content/60 mb-10 leading-relaxed font-medium">
                Launch contests, build your brand, and discover top talent with
                our specialized toolset for industry leaders.
              </p>

              <div className="grid gap-4 mb-12">
                {forCreators.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-base-100 p-4 rounded-2xl border border-base-300 hover:border-indigo-500/30 transition-colors"
                  >
                    <CheckCircle2 className="text-indigo-500" size={24} />
                    <span className="text-base-content font-bold">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className="btn btn-lg bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl px-10 shadow-xl shadow-indigo-500/20 font-black tracking-tight"
              >
                Become a Creator
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 to-purple-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-base-100 rounded-[3rem] border border-base-300 p-12 flex flex-col items-center justify-center min-h-[400px] shadow-inner transition-all duration-700">
                  <div className="text-9xl mb-8 animate-bounce">🚀</div>
                  <div className="text-center">
                    <h4 className="text-2xl font-black text-base-content">
                      Ready to launch?
                    </h4>
                    <p className="text-base-content/40 font-medium">
                      The world is waiting for your next big challenge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
