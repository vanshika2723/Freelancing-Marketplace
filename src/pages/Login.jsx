import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Users,
  Sparkles,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const savedUser = localStorage.getItem("freelanceUser");

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      formData.email !== user.email ||
      formData.password !== user.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    // Logged In User Save
    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem(
      "freelanceLoggedIn",
      JSON.stringify(true)
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

          {/* Background decoration */}
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
                India's Growing Freelance Community
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Turn your skills into
                <span className="text-indigo-400">
                  {" "}opportunities.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                Connect with talented freelancers, discover exciting
                projects, and build meaningful professional relationships
                through FreelanceHub.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <BriefcaseBusiness
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Find Great Projects
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Discover projects that match your skills.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <Users
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Connect With People
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Build relationships with clients and freelancers.
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <CheckCircle2
                      size={20}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Grow Your Career
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Build your reputation and grow professionally.
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
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to your FreelanceHub account
              </p>

            </div>


            {/* Login Card */}
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

                  <div className="flex items-center justify-between">

                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>

                  </div>

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
                      placeholder="Enter your password"
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

                </div>


                {/* Remember / Forgot */}
                <div className="flex items-center justify-between">

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">

                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    Remember me

                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot Password?
                  </button>

                </div>


                {/* Login Button */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Sign In

                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

              </form>


              {/* Signup */}
              <p className="mt-7 text-center text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                  to="/signup"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Create Account
                </Link>

              </p>

            </div>


            {/* Bottom Text */}
            <p className="mt-6 text-center text-xs text-slate-400">
              By signing in, you agree to our Terms of Service
              and Privacy Policy.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Login;