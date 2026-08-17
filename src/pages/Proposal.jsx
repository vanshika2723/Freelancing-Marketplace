import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  FileText,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";

import projects from "../data/projects";

function Proposal() {
  const { id } = useParams();
const navigate = useNavigate();
  const project = projects.find(
    (item) => item.id === Number(id)
  );

  const [formData, setFormData] = useState({
    freelancerName: "",
    email: "",
    phone: "",
    expectedBudget: "",
    experience: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-slate-900">
            Project Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            We couldn't find the project you're trying to apply for.
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.freelancerName.trim()) {
      newErrors.freelancerName =
        "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!formData.expectedBudget) {
      newErrors.expectedBudget =
        "Please enter your expected budget.";
    } else if (Number(formData.expectedBudget) <= 0) {
      newErrors.expectedBudget =
        "Budget must be greater than zero.";
    }

    if (!formData.experience) {
      newErrors.experience =
        "Please select your experience level.";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter =
        "Please write a proposal.";
    } else if (formData.coverLetter.trim().length < 100) {
      newErrors.coverLetter =
        "Proposal should contain at least 100 characters.";
    }

    return newErrors;
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first to submit a proposal");
    navigate("/login");
    return;
  }

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const existingProposals =
    JSON.parse(localStorage.getItem("skillconnectProposals")) || [];

  const newProposal = {
    id: Date.now(),
    projectId: project.id,
    projectTitle: project.title,
    client: project.client,
    ...formData,
    submittedAt: new Date().toISOString(),
    status: "Submitted",
    freelancerId: user.id,
  };

  localStorage.setItem(
    "skillconnectProposals",
    JSON.stringify([
      ...existingProposals,
      newProposal,
    ])
  );

  setSubmitted(true);
};
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl md:p-12">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2
              size={42}
              className="text-emerald-500"
            />
          </div>

          <h1 className="mt-7 text-3xl font-bold text-slate-900">
            Proposal Submitted!
          </h1>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-500">
            Your proposal for{" "}
            <span className="font-semibold text-slate-700">
              {project.title}
            </span>{" "}
            has been successfully submitted to{" "}
            <span className="font-semibold text-slate-700">
              {project.client}
            </span>
            .
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">

            <div className="flex items-center justify-between border-b border-slate-200 pb-4">

              <span className="text-sm text-slate-500">
                Expected Budget
              </span>

              <span className="font-bold text-slate-900">
                ${Number(formData.expectedBudget).toLocaleString()}
              </span>

            </div>

            <div className="flex items-center justify-between pt-4">

              <span className="text-sm text-slate-500">
                Status
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Submitted
              </span>

            </div>

          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/dashboard"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/projects"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Browse More Projects
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-slate-950 px-6 py-12">

        <div className="mx-auto max-w-none w-full">

          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Project
          </Link>

          <div className="mt-8">

            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
              Submit Proposal
            </span>

            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Apply for this Project
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Tell the client why you're the right person for this project
              and submit your proposal.
            </p>

          </div>

        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-none w-full px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >

            <div className="flex items-center gap-3 border-b border-slate-100 pb-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileText size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Your Proposal
                </h2>

                <p className="text-sm text-slate-500">
                  Complete the form below
                </p>
              </div>

            </div>

            {/* Name */}
            <div className="mt-7">

              <label className="text-sm font-semibold text-slate-800">
                Full Name
              </label>

              <div className="relative mt-2">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="freelancerName"
                  value={formData.freelancerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition ${
                    errors.freelancerName
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-indigo-500"
                  }`}
                />

              </div>

              {errors.freelancerName && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.freelancerName}
                </p>
              )}

            </div>

            {/* Email + Phone */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="text-sm font-semibold text-slate-800">
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
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm outline-none ${
                      errors.email
                        ? "border-red-400"
                        : "border-slate-200 focus:border-indigo-500"
                    }`}
                  />

                </div>

                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}

              </div>

              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Phone Number
                </label>

                <div className="relative mt-2">

                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm outline-none ${
                      errors.phone
                        ? "border-red-400"
                        : "border-slate-200 focus:border-indigo-500"
                    }`}
                  />

                </div>

                {errors.phone && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.phone}
                  </p>
                )}

              </div>

            </div>

            {/* Budget + Experience */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Expected Budget ($)
                </label>

                <div className="relative mt-2">

                  <DollarSign
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    name="expectedBudget"
                    value={formData.expectedBudget}
                    onChange={handleChange}
                    placeholder="1000"
                    min="1"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm outline-none ${
                      errors.expectedBudget
                        ? "border-red-400"
                        : "border-slate-200 focus:border-indigo-500"
                    }`}
                  />

                </div>

                {errors.expectedBudget && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.expectedBudget}
                  </p>
                )}

              </div>

              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Experience Level
                </label>

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none ${
                    errors.experience
                      ? "border-red-400"
                      : "border-slate-200 focus:border-indigo-500"
                  }`}
                >
                  <option value="">
                    Select experience
                  </option>

                  <option value="Entry">
                    Entry Level
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Expert">
                    Expert
                  </option>
                </select>

                {errors.experience && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.experience}
                  </p>
                )}

              </div>

            </div>

            {/* Cover Letter */}
            <div className="mt-6">

              <div className="flex items-center justify-between">

                <label className="text-sm font-semibold text-slate-800">
                  Cover Letter / Proposal
                </label>

                <span className="text-xs text-slate-400">
                  {formData.coverLetter.length}/2000
                </span>

              </div>

              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => {
                  if (e.target.value.length <= 2000) {
                    handleChange(e);
                  }
                }}
                rows="8"
                placeholder="Explain your experience, approach, timeline, and why you're a good fit for this project..."
                className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3.5 text-sm leading-6 outline-none ${
                  errors.coverLetter
                    ? "border-red-400"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
              />

              {errors.coverLetter && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.coverLetter}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-400">
                Minimum 100 characters recommended for a strong proposal.
              </p>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
            >
              <Send size={18} />
              Submit Proposal
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              By submitting this proposal, you confirm that the information
              provided is accurate.
            </p>

          </form>

          {/* Project Summary */}
          <aside className="space-y-6">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Applying For
              </p>

              <h2 className="mt-3 text-xl font-bold leading-7 text-slate-900">
                {project.title}
              </h2>

              <span className="mt-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                {project.category}
              </span>

              <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">

                <div className="flex items-center gap-3">

                  <DollarSign
                    size={18}
                    className="text-indigo-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Client Budget
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      ${project.budget.toLocaleString()}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <CalendarDays
                    size={18}
                    className="text-indigo-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Deadline
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {project.deadline}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Tips */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

              <h3 className="font-bold text-indigo-900">
                Proposal Tips
              </h3>

              <ul className="mt-5 space-y-3">

                <li className="flex items-start gap-2 text-sm leading-6 text-indigo-800">
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0"
                  />
                  Personalize your proposal for this project.
                </li>

                <li className="flex items-start gap-2 text-sm leading-6 text-indigo-800">
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0"
                  />
                  Highlight relevant experience and skills.
                </li>

                <li className="flex items-start gap-2 text-sm leading-6 text-indigo-800">
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0"
                  />
                  Clearly explain your approach.
                </li>

                <li className="flex items-start gap-2 text-sm leading-6 text-indigo-800">
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0"
                  />
                  Keep your proposal professional and concise.
                </li>

              </ul>

            </div>

          </aside>

        </div>
      </section>

    </main>
  );
}

export default Proposal;