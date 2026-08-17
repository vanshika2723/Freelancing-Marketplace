import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Trophy,
} from "lucide-react";

import freelancers from "../data/freelancers";

function FreelancerProfile() {
  const { id } = useParams();
const navigate = useNavigate();
  const freelancer = freelancers.find(
    (item) => item.id === Number(id)
  );

  if (!freelancer) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-slate-900">
            Freelancer Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The freelancer profile you're looking for doesn't exist.
          </p>

          <Link
            to="/freelancers"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Freelancers
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          PROFILE HEADER
      ====================================================== */}
      <section className="bg-slate-950 px-6 py-12">

        <div className="mx-auto max-w-none w-full">

          <Link
            to="/freelancers"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Freelancers
          </Link>

          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="relative">

                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="h-28 w-28 rounded-3xl object-cover ring-4 ring-white/10"
                />

                <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-slate-950">
                  <CheckCircle2
                    size={18}
                    className="text-white"
                  />
                </span>

              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-3xl font-bold text-white md:text-4xl">
                    {freelancer.name}
                  </h1>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    {freelancer.availability}
                  </span>

                </div>

                <p className="mt-2 text-lg text-slate-300">
                  {freelancer.title}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">

                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    {freelancer.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <strong className="text-white">
                      {freelancer.rating}
                    </strong>

                    ({freelancer.reviews} reviews)
                  </span>

                </div>

              </div>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <MessageCircle size={18} />
                Message
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                <BriefcaseBusiness size={18} />
                Hire Freelancer
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-none w-full px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* About */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                About Me
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {freelancer.bio}
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                I focus on delivering high-quality work, maintaining clear
                communication, and building long-term relationships with
                clients. Every project is approached with attention to
                detail and a strong focus on business goals.
              </p>

            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Skills & Expertise
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </section>

            {/* Portfolio */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Portfolio
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Selected work and recent projects
                  </p>
                </div>

              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {freelancer.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >

                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    </div>

                    <div className="p-4">

                      <span className="text-xs font-semibold text-indigo-600">
                        {item.category}
                      </span>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <button
                        type="button"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600"
                      >
                        View project
                        <ChevronRight size={14} />
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </section>

            {/* Reviews */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Client Reviews
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    What clients say about working with {freelancer.name}
                  </p>
                </div>

                <div className="hidden items-center gap-2 sm:flex">

                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="font-bold text-slate-900">
                    {freelancer.rating}
                  </span>

                </div>

              </div>

              <div className="mt-6 space-y-5">

                {freelancer.testimonials.map((review, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-slate-50 p-5"
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <h3 className="font-bold text-slate-900">
                          {review.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {review.role}
                        </p>

                      </div>

                      <div className="flex items-center gap-1">

                        {Array.from({
                          length: review.rating,
                        }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={15}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}

                      </div>

                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      "{review.comment}"
                    </p>

                  </div>
                ))}

              </div>

            </section>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">

            {/* Rate */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Hourly Rate
              </p>

              <div className="mt-2 flex items-end gap-1">

                <span className="text-4xl font-bold text-slate-900">
                  ${freelancer.hourlyRate}
                </span>

                <span className="mb-1 text-sm text-slate-400">
                  /hour
                </span>

              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <BriefcaseBusiness size={17} />
                Hire {freelancer.name.split(" ")[0]}
              </button>

         <button
  type="button"
  onClick={() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/messages/${freelancer.id}`);
  }}
  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
>
  <MessageCircle size={17} />
  Send Message
</button>

            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-bold text-slate-900">
                Profile Statistics
              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <BriefcaseBusiness
                      size={18}
                      className="text-indigo-600"
                    />

                    <span className="text-sm text-slate-500">
                      Completed Projects
                    </span>

                  </div>

                  <strong className="text-slate-900">
                    {freelancer.completedProjects}
                  </strong>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Trophy
                      size={18}
                      className="text-indigo-600"
                    />

                    <span className="text-sm text-slate-500">
                      Success Rate
                    </span>

                  </div>

                  <strong className="text-slate-900">
                    {freelancer.successRate}%
                  </strong>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Star
                      size={18}
                      className="text-indigo-600"
                    />

                    <span className="text-sm text-slate-500">
                      Rating
                    </span>

                  </div>

                  <strong className="text-slate-900">
                    {freelancer.rating}/5
                  </strong>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <CalendarDays
                      size={18}
                      className="text-indigo-600"
                    />

                    <span className="text-sm text-slate-500">
                      Member Since
                    </span>

                  </div>

                  <strong className="text-slate-900">
                    {freelancer.memberSince}
                  </strong>

                </div>

              </div>

            </div>

            {/* Verification */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  <ShieldCheck
                    size={21}
                    className="text-emerald-600"
                  />
                </div>

                <div>

                  <h3 className="font-bold text-emerald-900">
                    Verified Freelancer
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    This freelancer has completed profile verification
                    and maintains a strong track record.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default FreelancerProfile;