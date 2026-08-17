import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Users,
  Sparkles,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    localStorage.setItem(
      "freelanceUser",
      JSON.stringify(formData)
    );

    localStorage.setItem(
      "freelanceLoggedIn",
      JSON.stringify(true)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(formData)
    );

    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">

          {/* Background Decoration */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div>

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                  F
                </div>

                <span className="text-xl font-bold text-white">
                  FreelanceHub
                </span>
              </Link>

            </div>


            {/* Main Content */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles size={16} />
                Start Your Freelance Journey
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Build your career.
                <span className="text-indigo-400">
                  {" "}Find your opportunities.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Create your FreelanceHub account and connect with
                clients, freelancers, and exciting projects from
                around the world.
              </p>


              {/* Features */}
              <div className="mt-10 space-y-5">

                {/* Feature 1 */}
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <BriefcaseBusiness
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Discover Opportunities
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Find projects that match your skills.
                    </p>
                  </div>

                </div>


                {/* Feature 2 */}
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <Users
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Connect & Collaborate
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Work with talented people and great clients.
                    </p>
                  </div>

                </div>


                {/* Feature 3 */}
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <CheckCircle2
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Grow Your Reputation
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Build your profile and grow your career.
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-500">

              <span>
                © 2026 FreelanceHub
              </span>

              <span>
                Freelance. Connect. Grow.
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                F
              </div>

              <h2 className="mt-3 text-xl font-bold text-slate-900">
                FreelanceHub
              </h2>

            </div>


            {/* Heading */}
            <div className="mb-8">

              <h1 className="text-3xl font-bold text-slate-900">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Join FreelanceHub and start building opportunities
              </p>

            </div>


            {/* Signup Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Full Name */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="relative mt-2">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>


                {/* Email */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative mt-2">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>


                {/* Password */}
                <div>

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative mt-2">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Password must contain at least 6 characters.
                  </p>

                </div>


                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-slate-500">

                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span>
                    I agree to the{" "}
                    <span className="font-semibold text-indigo-600">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-indigo-600">
                      Privacy Policy
                    </span>
                    .
                  </span>

                </label>


                {/* Create Account */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Create Account

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

              </form>


              {/* Login */}
              <p className="mt-7 text-center text-sm text-slate-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Sign In
                </Link>

              </p>

            </div>


            {/* Bottom Text */}
            <p className="mt-6 text-center text-xs text-slate-400">
              Create your account and start your freelance journey today.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Signup;