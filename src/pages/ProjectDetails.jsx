import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  MapPin,
  Send,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import projects from "../data/projects";

function ProjectDetails() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  // Project not found
  if (!project) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Users size={28} className="text-slate-400" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Project Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The project you're looking for doesn't exist or may have
            been removed.
          </p>

          <Link
            to="/projects"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <section className="bg-slate-950 px-6 py-12">

        <div className="mx-auto max-w-none w-full">

          {/* Back */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div className="max-w-4xl">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
                  {project.category}
                </span>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Open for proposals
                </span>

              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
                {project.title}
              </h1>

              <p className="mt-5 max-w-3xl leading-7 text-slate-400">
                {project.description}
              </p>

            </div>

            <Link
              to={`/projects/${project.id}/proposal`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500"
            >
              <Send size={18} />
              Submit a Proposal
            </Link>

          </div>

        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-none w-full px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div className="space-y-8">

            {/* Project Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Project Description
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {project.description}
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                The selected freelancer will be responsible for delivering
                high-quality work according to the client's requirements.
                Clear communication, timely delivery, and attention to
                detail are expected throughout the project.
              </p>

              <h3 className="mt-8 text-lg font-bold text-slate-900">
                What we're looking for
              </h3>

              <ul className="mt-4 space-y-3">

                <li className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-indigo-600"
                  />
                  Strong understanding of the required technologies and
                  project requirements.
                </li>

                <li className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-indigo-600"
                  />
                  Ability to communicate clearly and provide regular
                  project updates.
                </li>

                <li className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-indigo-600"
                  />
                  Deliver clean, professional, and high-quality work.
                </li>

                <li className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-indigo-600"
                  />
                  Complete the project within the agreed timeline.
                </li>

              </ul>

            </section>

            {/* Required Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Required Skills
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </section>

            {/* Project Activity */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Project Activity
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">

                <div className="rounded-xl bg-slate-50 p-5">

                  <Users
                    size={21}
                    className="text-indigo-600"
                  />

                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {project.proposals}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Proposals
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-5">

                  <Clock3
                    size={21}
                    className="text-indigo-600"
                  />

                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {project.experience}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Experience Level
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-5">

                  <CalendarDays
                    size={21}
                    className="text-indigo-600"
                  />

                  <p className="mt-4 text-lg font-bold text-slate-900">
                    {project.deadline}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Project Deadline
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}
          <aside className="space-y-6">

            {/* Budget Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-slate-500">
                Project Budget
              </p>

              <div className="mt-2 flex items-center gap-2">

                <DollarSign
                  size={25}
                  className="text-indigo-600"
                />

                <span className="text-3xl font-bold text-slate-900">
                  {project.budget.toLocaleString()}
                </span>

              </div>

              <p className="mt-1 text-xs text-slate-400">
                {project.budgetType}
              </p>

              <Link
                to={`/projects/${project.id}/proposal`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Send size={17} />
                Submit Proposal
              </Link>

            </div>

            {/* Project Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-bold text-slate-900">
                Project Information
              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex items-start gap-3">

                  <DollarSign
                    size={19}
                    className="mt-0.5 text-indigo-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Budget
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      ${project.budget.toLocaleString()}
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <CalendarDays
                    size={19}
                    className="mt-0.5 text-indigo-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Deadline
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {project.deadline}
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <Clock3
                    size={19}
                    className="mt-0.5 text-indigo-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Experience
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {project.experience}
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <Users
                    size={19}
                    className="mt-0.5 text-indigo-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Proposals
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {project.proposals} submitted
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Client Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                About the Client
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-600">
                  {project.client.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {project.client}
                  </h3>

                  <div className="mt-1 flex items-center gap-1">

                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm font-semibold text-slate-700">
                      {project.clientRating}
                    </span>

                    <span className="text-xs text-slate-400">
                      client rating
                    </span>

                  </div>
                </div>

              </div>

              <div className="mt-6 space-y-4">

                <div className="flex items-center gap-3 text-sm text-slate-500">

                  <MapPin
                    size={17}
                    className="text-indigo-600"
                  />

                  {project.clientLocation}

                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500">

                  <ShieldCheck
                    size={17}
                    className="text-emerald-500"
                  />

                  Verified Client

                </div>

              </div>

            </div>

          </aside>

        </div>
      </section>

    </main>
  );
}

export default ProjectDetails;