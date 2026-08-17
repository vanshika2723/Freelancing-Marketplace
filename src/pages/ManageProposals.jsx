import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  Clock3,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

import proposals from "../data/proposals";

function ManageProposals() {
  const [proposalList, setProposalList] = useState(() => {
    const savedProposals = localStorage.getItem(
      "freelanceProposals"
    );

    return savedProposals
      ? JSON.parse(savedProposals)
      : proposals;
  });

  const [selectedProposal, setSelectedProposal] =
    useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-700";

      case "Rejected":
        return "bg-red-50 text-red-600";

      case "Shortlisted":
        return "bg-indigo-50 text-indigo-700";

      case "Under Review":
        return "bg-amber-50 text-amber-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };
  const updateProjectStatus = (projectId, status) => {
  const savedProjects = localStorage.getItem(
    "freelanceProjects"
  );

  if (!savedProjects) return;

  const projects = JSON.parse(savedProjects);

  const updatedProjects = projects.map((project) =>
    project.id === projectId
      ? {
          ...project,
          status,
        }
      : project
  );

  localStorage.setItem(
    "freelanceProjects",
    JSON.stringify(updatedProjects)
  );
};

const updateProposalStatus = (id, status) => {
  const selected = proposalList.find(
    (proposal) => proposal.id === id
  );

  if (!selected) return;

  let updatedProposals = proposalList.map((proposal) =>
    proposal.id === id
      ? {
          ...proposal,
          status,
        }
      : proposal
  );

  // If a proposal is accepted,
  // reject other proposals for the same project
  if (status === "Accepted") {
    updatedProposals = updatedProposals.map((proposal) => {
      if (
        proposal.projectId === selected.projectId &&
        proposal.id !== selected.id
      ) {
        return {
          ...proposal,
          status: "Rejected",
        };
      }

      return proposal;
    });
  }

  setProposalList(updatedProposals);

  localStorage.setItem(
    "freelanceProposals",
    JSON.stringify(updatedProposals)
  );

  // Accepted → project goes In Progress
  if (status === "Accepted") {
    updateProjectStatus(
      selected.projectId,
      "In Progress"
    );
  }

  // Rejected → project remains Open
  if (status === "Rejected") {
    updateProjectStatus(
      selected.projectId,
      "Open"
    );
  }

  // Shortlisted → project remains Open
  if (status === "Shortlisted") {
    updateProjectStatus(
      selected.projectId,
      "Open"
    );
  }

  // Update opened modal
  const updatedSelectedProposal = updatedProposals.find(
    (proposal) => proposal.id === id
  );

  setSelectedProposal(updatedSelectedProposal || null);
};
  const formatBudget = (amount) => {
    return `$${Number(amount).toLocaleString()}`;
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-none w-full items-center justify-between px-5 py-5 md:px-8">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              F
            </div>

            <span className="font-bold text-slate-900">
              FreelanceHub
            </span>

          </div>

        </div>

      </header>

      {/* Content */}
      <section className="mx-auto max-w-none w-full px-5 py-10 md:px-8">

        {/* Heading */}
        <div className="mb-8">

          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            <BriefcaseBusiness size={14} />
            Project Management
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Manage Proposals
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 md:text-base">
            Review proposals from freelancers and select the
            best professional for your project.
          </p>

        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Total Proposals
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {proposalList.length}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Under Review
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {
                proposalList.filter(
                  (proposal) =>
                    proposal.status === "Under Review"
                ).length
              }
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Shortlisted
            </p>

            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {
                proposalList.filter(
                  (proposal) =>
                    proposal.status === "Shortlisted"
                ).length
              }
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Accepted
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {
                proposalList.filter(
                  (proposal) =>
                    proposal.status === "Accepted"
                ).length
              }
            </p>

          </div>

        </div>

        {/* Empty State */}
        {proposalList.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <BriefcaseBusiness
                size={30}
                className="text-indigo-600"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No Proposals Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You haven't received any proposals for your
              projects yet.
            </p>

            <Link
              to="/dashboard"
              className="mt-6 inline-flex items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Back to Dashboard
            </Link>

          </div>
        ) : (

          /* Proposal Cards */
          <div className="grid gap-5">

            {proposalList.map((proposal) => (

              <div
                key={proposal.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  {/* Freelancer */}
                  <div className="flex items-start gap-4">

                    <img
                      src={proposal.freelancer.image}
                      alt={proposal.freelancer.name}
                      className="h-14 w-14 rounded-2xl object-cover"
                    />

                    <div>

                      <h2 className="font-bold text-slate-900">
                        {proposal.freelancer.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {proposal.freelancer.title}
                      </p>

                      <p className="mt-2 flex items-center gap-1 text-xs text-indigo-600">
                        <BriefcaseBusiness size={13} />
                        {proposal.project}
                      </p>

                    </div>

                  </div>

                  {/* Budget */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Expected Budget
                    </p>

                    <p className="mt-1 flex items-center gap-1 font-bold text-slate-900">

                      <DollarSign size={16} />

                      {formatBudget(
                        proposal.expectedBudget
                      )}

                    </p>

                  </div>

                  {/* Date */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Submitted
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-700">

                      <Clock3 size={14} />

                      {proposal.submitted}

                    </p>

                  </div>

                  {/* Status */}
                  <span
                    className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${getStatusClass(
                      proposal.status
                    )}`}
                  >
                    {proposal.status}
                  </span>

                </div>

                {/* Bottom */}
                <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProposal(proposal)
                    }
                    className="text-left text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View Proposal →
                  </button>

                 <div className="flex flex-wrap gap-2">

  {proposal.status !== "Accepted" &&
    proposal.status !== "Rejected" && (
      <>
        {proposal.status === "Under Review" && (
          <button
            type="button"
            onClick={() =>
              updateProposalStatus(
                proposal.id,
                "Shortlisted"
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
          >
            <Check size={15} />
            Shortlist
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            updateProposalStatus(
              proposal.id,
              "Accepted"
            )
          }
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700"
        >
          <Check size={15} />
          Accept
        </button>

        <button
          type="button"
          onClick={() =>
            updateProposalStatus(
              proposal.id,
              "Rejected"
            )
          }
          className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100"
        >
          <X size={15} />
          Reject
        </button>
      </>
    )}

</div>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">

              <div className="flex items-center gap-3">

                <img
                  src={selectedProposal.freelancer.image}
                  alt={selectedProposal.freelancer.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />

                <div>

                  <h2 className="font-bold text-slate-900">
                    {selectedProposal.freelancer.name}
                  </h2>

                  <p className="text-xs text-slate-500">
                    {selectedProposal.freelancer.title}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedProposal(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X size={18} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="space-y-6 p-6">

              {/* Project */}
              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Project
                </p>

                <p className="mt-2 font-bold text-slate-900">
                  {selectedProposal.project}
                </p>

              </div>

              {/* Contact */}
              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Contact Details
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">

                    <Mail
                      size={17}
                      className="text-indigo-600"
                    />

                    <span className="text-sm text-slate-700">
                      {selectedProposal.contact.email}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">

                    <Phone
                      size={17}
                      className="text-indigo-600"
                    />

                    <span className="text-sm text-slate-700">
                      {selectedProposal.contact.phone}
                    </span>

                  </div>

                </div>

              </div>

              {/* Budget */}
              <div className="rounded-2xl bg-indigo-50 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-indigo-500">
                      Expected Budget
                    </p>

                    <p className="mt-1 text-2xl font-bold text-indigo-700">
                      {formatBudget(
                        selectedProposal.expectedBudget
                      )}
                    </p>

                  </div>

                  <DollarSign
                    size={28}
                    className="text-indigo-500"
                  />

                </div>

              </div>

              {/* Cover Letter */}
              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Cover Letter
                </p>

                <p className="mt-3 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                  {selectedProposal.coverLetter}
                </p>

              </div>

              {/* Status */}
              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Proposal Status
                </p>

                <span
                  className={`mt-3 inline-flex rounded-full px-4 py-2 text-xs font-semibold ${getStatusClass(
                    selectedProposal.status
                  )}`}
                >
                  {selectedProposal.status}
                </span>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex flex-col gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">

              {selectedProposal.status !== "Accepted" &&
                selectedProposal.status !== "Rejected" && (
                  <>
                  {selectedProposal.status === "Under Review" && (
  <button
    type="button"
    onClick={() => {
      updateProposalStatus(
        selectedProposal.id,
        "Shortlisted"
      );
    }}
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-100"
  >
    <Check size={17} />
    Shortlist Proposal
  </button>
)}
                    <button
                      type="button"
                      onClick={() => {
                        updateProposalStatus(
                          selectedProposal.id,
                          "Accepted"
                        );
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <Check size={17} />
                      Accept Proposal
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateProposalStatus(
                          selectedProposal.id,
                          "Rejected"
                        );
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                      <X size={17} />
                      Reject Proposal
                    </button>
                  </>
                )}

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default ManageProposals;