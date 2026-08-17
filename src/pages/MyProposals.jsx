import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  XCircle,
} from "lucide-react";

function MyProposals() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const savedProposals =
      JSON.parse(localStorage.getItem("skillconnectProposals")) || [];

    setProposals(savedProposals.reverse());
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-600";

      case "Rejected":
        return "bg-red-50 text-red-600";

      case "Submitted":
      default:
        return "bg-indigo-50 text-indigo-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle2 size={15} />;

      case "Rejected":
        return <XCircle size={15} />;

      default:
        return <Clock3 size={15} />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HEADER
      ====================================================== */}
    <section className="bg-slate-950 px-6 py-14">

  <div className="mx-auto max-w-5xl text-center">

    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
      Freelancer Dashboard
    </p>

    <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
      My Proposals
    </h1>

    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
      Track the projects you have applied for and monitor the status
      of your submitted proposals.
    </p>

  </div>

</section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-none w-full px-6 py-10">

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText size={21} />
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {proposals.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total Proposals
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={21} />
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {
                proposals.filter(
                  (proposal) => proposal.status === "Submitted"
                ).length
              }
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Pending Proposals
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {
                proposals.filter(
                  (proposal) => proposal.status === "Accepted"
                ).length
              }
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Accepted Proposals
            </p>

          </div>

        </div>

        {/* =================================================
            PROPOSALS
        ================================================== */}
        <div className="mt-10">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Submitted Proposals
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recent project applications
            </p>

          </div>

          {proposals.length === 0 ? (

            /* Empty State */
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search
                  size={27}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                No proposals yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven't submitted any project proposals yet.
                Explore available projects and submit your first proposal.
              </p>

              <Link
                to="/projects"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Browse Projects
                <ArrowRight size={17} />
              </Link>

            </div>

          ) : (

            /* Proposal List */
            <div className="space-y-5">

              {proposals.map((proposal) => (

                <article
                  key={proposal.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md md:p-7"
                >

                  <div className="flex flex-col justify-between gap-5 lg:flex-row">

                    {/* Project Info */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                          Proposal
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            proposal.status
                          )}`}
                        >
                          {getStatusIcon(proposal.status)}
                          {proposal.status}
                        </span>

                      </div>

                      <h3 className="mt-4 text-xl font-bold text-slate-900">
                        {proposal.projectTitle}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Client:{" "}
                        <span className="font-semibold text-slate-700">
                          {proposal.client}
                        </span>
                      </p>

                      {/* Proposal Details */}
                      <div className="mt-5 grid gap-4 sm:grid-cols-3">

                        <div className="rounded-xl bg-slate-50 p-4">

                          <p className="text-xs text-slate-400">
                            Expected Budget
                          </p>

                          <p className="mt-1 font-bold text-slate-900">
                            $
                            {Number(
                              proposal.expectedBudget
                            ).toLocaleString()}
                          </p>

                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">

                          <p className="text-xs text-slate-400">
                            Experience
                          </p>

                          <p className="mt-1 font-bold text-slate-900">
                            {proposal.experience}
                          </p>

                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">

                          <p className="text-xs text-slate-400">
                            Submitted
                          </p>

                          <p className="mt-1 flex items-center gap-1.5 font-bold text-slate-900">
                            <CalendarDays size={15} />
                            {new Date(
                              proposal.submittedAt
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      </div>

                      {/* Cover Letter */}
                      <div className="mt-5">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Proposal
                        </p>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                          {proposal.coverLetter}
                        </p>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default MyProposals;