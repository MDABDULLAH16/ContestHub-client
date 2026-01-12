import React from "react";
import { Send, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

const Newsletter = () => {

    const handleSubscribe = (e) => {
        e.preventDefault();
        Swal.fire({
          title: "Subscribe Successful!",
          text: "Thank you for you interest",
          icon: "success",
        });
    }

  return (
    <section className="py-16 bg-base-100">
      <div className=" mx-auto px-4">
        {/* Main Card with Glassmorphism effect */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-purple-700 to-indigo-900 text-white  p-8 md:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -translate-x-1/4 translate-y-1/4 blur-2xl"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              Never Miss a Challenge
            </h2>
            <p className="max-w-xl text-lg opacity-90 mb-10">
              Join our community of 50k+ creators. Get the latest contests,
              design prompts, and winning tips delivered to your inbox.
            </p>

            {/* daisyUI Input Group */}
            <form
              onSubmit={ handleSubscribe}
              className="form-control w-full max-w-lg"
            >
              <div className="join w-full shadow-lg">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered join-item w-full bg-base-100 text-base-content focus:outline-none"
                  required
                />
                <button className="btn bg-linear-to-br from-indigo-400 to-purple-500  text-white join-item px-8 border-none hover:brightness-110">
                  <span className="hidden sm:inline">Subscribe</span>
                  <Send size={18} className="ml-2" />
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium opacity-80">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} /> No spam, ever
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={16} /> Unsubscribe anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={16} /> Verified Contests
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
