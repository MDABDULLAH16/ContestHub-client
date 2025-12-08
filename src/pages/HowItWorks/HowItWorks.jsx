import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How ContestHub Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete platform for discovering opportunities and showcasing
            talent
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          For Participants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="text-4xl font-bold text-indigo-600 mb-3">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* For Creators Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              For Contest Creators
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Launch contests, build your brand, and discover top talent in your
              industry.
            </p>
            <ul className="space-y-4">
              {forCreators.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Become a Creator
            </Link>
          </div>
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-6xl">🚀</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
