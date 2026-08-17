import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  FileText,
  MapPin,
  Plus,
  Send,
  Tag,
  X,
} from "lucide-react";

import projects from "../data/projects";

function PostProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    skills: [],
    skillInput: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    client: "",
    clientLocation: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const categories = [
    "Web Development",
    "UI/UX Design",
    "Mobile Development",
    "Backend Development",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Data Science",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const addSkill = () => {
    const skill = formData.skillInput.trim();

    if (!skill) return;

    const alreadyExists = formData.skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setFormData((prev) => ({
        ...prev,
        skillInput: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
      skillInput: "",
    }));

    setErrors((prev) => ({
      ...prev,
      skills: "",
    }));
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required.";
    } else if (formData.title.trim().length < 10) {
      newErrors.title =
        "Project title should contain at least 10 characters.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required.";
    } else if (formData.description.trim().length < 30) {
      newErrors.description =
        "Description should contain at least 30 characters.";
    }

    if (formData.skills.length === 0) {
      newErrors.skills =
        "Add at least one required skill.";
    }

    if (!formData.budgetMin) {
      newErrors.budgetMin =
        "Minimum budget is required.";
    } else if (Number(formData.budgetMin) <= 0) {
      newErrors.budgetMin =
        "Minimum budget must be greater than 0.";
    }

    if (!formData.budgetMax) {
      newErrors.budgetMax =
        "Maximum budget is required.";
    } else if (Number(formData.budgetMax) <= 0) {
      newErrors.budgetMax =
        "Maximum budget must be greater than 0.";
    }

    if (
      formData.budgetMin &&
      formData.budgetMax &&
      Number(formData.budgetMin) >= Number(formData.budgetMax)
    ) {
      newErrors.budgetMax =
        "Maximum budget must be greater than minimum budget.";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Project deadline is required.";
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.deadline =
          "Deadline must be a future date.";
      }
    }

    if (!formData.client.trim()) {
      newErrors.client =
        "Client or company name is required.";
    }

    if (!formData.clientLocation.trim()) {
      newErrors.clientLocation =
        "Client location is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(false);

    const isValid = validate();

    if (!isValid) {
      return;
    }

    const newProject = {
      id: Date.now(),

      title: formData.title.trim(),

      category: formData.category,

      budgetMin: Number(formData.budgetMin),

      budgetMax: Number(formData.budgetMax),

      budget: `$${Number(
        formData.budgetMin
      ).toLocaleString()} - $${Number(
        formData.budgetMax
      ).toLocaleString()}`,

      description: formData.description.trim(),

      skills: formData.skills,

      deadline: formData.deadline,

      client: formData.client.trim(),

      clientLocation:
        formData.clientLocation.trim(),

      proposals: 0,

      status: "Open",

      createdAt: "Just now",
    };

    const existingProjects =
      JSON.parse(
        localStorage.getItem("freelanceProjects")
      ) || projects;

    const updatedProjects = [
      newProject,
      ...existingProjects,
    ];

    localStorage.setItem(
      "freelanceProjects",
      JSON.stringify(updatedProjects)
    );

    setSuccess(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
      errors[field]
        ? "border-red-300"
        : "border-slate-200"
    }`;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-none w-full items-center justify-between px-6 py-5">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="hidden items-center gap-2 sm:flex">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              F
            </div>

            <span className="font-bold text-slate-900">
              FreelanceHub
            </span>

          </div>

        </div>

      </header>

      {/* Main */}
      <section className="px-5 py-10 md:px-8">

        <div className="mx-auto max-w-4xl">

          {/* Heading */}
          <div className="mb-8">

            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              <BriefcaseBusiness size={14} />
              Marketplace
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Post a New Project
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Tell freelancers what you need and receive proposals
              from talented professionals.
            </p>

          </div>

          {/* Success */}
          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">

              <CheckCircle2 size={20} />

              Project posted successfully! Redirecting to
              dashboard...

            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >

            {/* Basic Information */}
            <div className="border-b border-slate-100 p-6 md:p-8">

              <div className="mb-7">

                <h2 className="text-lg font-bold text-slate-900">
                  Project Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Provide the basic details of your project.
                </p>

              </div>

              <div className="grid gap-6">

                {/* Title */}
                <div>

                  <label
                    htmlFor="title"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Project Title
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Build a modern e-commerce website"
                    className={inputClass("title")}
                  />

                  {errors.title && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.title}
                    </p>
                  )}

                </div>

                {/* Category */}
                <div>

                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Project Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass("category")}
                  >

                    <option value="">
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}

                  </select>

                  {errors.category && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.category}
                    </p>
                  )}

                </div>

                {/* Description */}
                <div>

                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Project Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="7"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, expected deliverables and requirements..."
                    className={`${inputClass(
                      "description"
                    )} resize-none`}
                  />

                  <div className="mt-2 flex justify-between">

                    <p className="text-xs text-slate-400">
                      Minimum 30 characters
                    </p>

                    <p className="text-xs text-slate-400">
                      {formData.description.length}
                    </p>

                  </div>

                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.description}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* Skills */}
            <div className="border-b border-slate-100 p-6 md:p-8">

              <div className="mb-7">

                <h2 className="text-lg font-bold text-slate-900">
                  Required Skills
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add the skills freelancers should have.
                </p>

              </div>

              <div className="flex gap-3">

                <div className="relative flex-1">

                  <Tag
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={formData.skillInput}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        skillInput: e.target.value,
                      }))
                    }
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. React"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Plus size={17} />
                  Add
                </button>

              </div>

              {formData.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="rounded-full hover:bg-indigo-100"
                      >
                        <X size={14} />
                      </button>

                    </span>
                  ))}

                </div>
              )}

              {errors.skills && (
                <p className="mt-3 text-xs text-red-500">
                  {errors.skills}
                </p>
              )}

            </div>

            {/* Budget & Deadline */}
            <div className="border-b border-slate-100 p-6 md:p-8">

              <div className="mb-7">

                <h2 className="text-lg font-bold text-slate-900">
                  Budget & Timeline
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Set your project budget and expected completion date.
                </p>

              </div>

              <div className="grid gap-6 md:grid-cols-3">

                {/* Min Budget */}
                <div>

                  <label
                    htmlFor="budgetMin"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Minimum Budget
                  </label>

                  <div className="relative">

                    <DollarSign
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="budgetMin"
                      name="budgetMin"
                      type="number"
                      min="1"
                      value={formData.budgetMin}
                      onChange={handleChange}
                      placeholder="500"
                      className={`${inputClass(
                        "budgetMin"
                      )} pl-11`}
                    />

                  </div>

                  {errors.budgetMin && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.budgetMin}
                    </p>
                  )}

                </div>

                {/* Max Budget */}
                <div>

                  <label
                    htmlFor="budgetMax"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Maximum Budget
                  </label>

                  <div className="relative">

                    <DollarSign
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="budgetMax"
                      name="budgetMax"
                      type="number"
                      min="1"
                      value={formData.budgetMax}
                      onChange={handleChange}
                      placeholder="1500"
                      className={`${inputClass(
                        "budgetMax"
                      )} pl-11`}
                    />

                  </div>

                  {errors.budgetMax && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.budgetMax}
                    </p>
                  )}

                </div>

                {/* Deadline */}
                <div>

                  <label
                    htmlFor="deadline"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Deadline
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      className={`${inputClass(
                        "deadline"
                      )} pl-11`}
                    />

                  </div>

                  {errors.deadline && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.deadline}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* Client Details */}
            <div className="border-b border-slate-100 p-6 md:p-8">

              <div className="mb-7">

                <h2 className="text-lg font-bold text-slate-900">
                  Client Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Provide the client or company information.
                </p>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                {/* Client */}
                <div>

                  <label
                    htmlFor="client"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Client / Company Name
                  </label>

                  <div className="relative">

                    <BriefcaseBusiness
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="client"
                      name="client"
                      type="text"
                      value={formData.client}
                      onChange={handleChange}
                      placeholder="e.g. TechNova Solutions"
                      className={`${inputClass(
                        "client"
                      )} pl-11`}
                    />

                  </div>

                  {errors.client && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.client}
                    </p>
                  )}

                </div>

                {/* Location */}
                <div>

                  <label
                    htmlFor="clientLocation"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Client Location
                  </label>

                  <div className="relative">

                    <MapPin
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="clientLocation"
                      name="clientLocation"
                      type="text"
                      value={formData.clientLocation}
                      onChange={handleChange}
                      placeholder="e.g. Delhi, India"
                      className={`${inputClass(
                        "clientLocation"
                      )} pl-11`}
                    />

                  </div>

                  {errors.clientLocation && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.clientLocation}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* Submit */}
            <div className="flex flex-col-reverse gap-3 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">

              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={success}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={17} />
                Post Project
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}

export default PostProject;