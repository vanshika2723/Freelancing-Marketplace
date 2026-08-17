import { useMemo, useState } from "react";

import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

function Projects() {
  // =====================================================
  // FILTER STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [budget, setBudget] = useState("All Budgets");
  const [experience, setExperience] = useState("All Levels");

  const [mobileFilters, setMobileFilters] = useState(false);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "All Categories",
    ...new Set(projects.map((project) => project.category)),
  ];

  // =====================================================
  // FILTER PROJECTS
  // =====================================================

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        project.title?.toLowerCase().includes(searchValue) ||
        project.description
          ?.toLowerCase()
          .includes(searchValue) ||
        project.skills?.some((skill) =>
          skill.toLowerCase().includes(searchValue)
        );

      // Category
      const matchesCategory =
        category === "All Categories" ||
        project.category === category;

      // Budget
   const projectBudget = Number(project.budget) || 0;

const matchesBudget =
  budget === "All Budgets" ||
  (budget === "Under $500" &&
    projectBudget < 500) ||
  (budget === "$500 - $1,000" &&
    projectBudget >= 500 &&
    projectBudget <= 1000) ||
  (budget === "$1,000 - $2,000" &&
    projectBudget > 1000 &&
    projectBudget <= 2000) ||
  (budget === "$2,000+" &&
    projectBudget > 2000);

      // Experience
      const matchesExperience =
        experience === "All Levels" ||
        project.experience === experience;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBudget &&
        matchesExperience
      );
    });
  }, [search, category, budget, experience]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setBudget("All Budgets");
    setExperience("All Levels");
  };

  // =====================================================
  // CHECK ACTIVE FILTERS
  // =====================================================

  const hasFilters =
    search.trim() !== "" ||
    category !== "All Categories" ||
    budget !== "All Budgets" ||
    experience !== "All Levels";

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =================================================
          HERO / HEADER
      ================================================= */}

    <section className="bg-slate-950 px-6 py-20">
  <div className="mx-auto max-w-5xl text-center">

    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
      Explore Opportunities
    </p>

    <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
      Find Your Next Project
    </h1>

    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
      Browse freelance opportunities, discover exciting projects,
      and connect with clients looking for your expertise.
    </p>

    {/* Search */}
    <div className="mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-2xl bg-white p-2 shadow-xl">

      <Search
        size={21}
        className="ml-3 shrink-0 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search projects, skills or keywords..."
        className="flex-1 bg-transparent px-2 py-3 text-sm text-slate-800 outline-none"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={17} />
        </button>
      )}

    </div>

  </div>
</section>
      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="mx-auto max-w-none w-full px-6 py-10">

        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={() => setMobileFilters(true)}
          className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
        >
          <SlidersHorizontal size={18} />
          Filters

          {hasFilters && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[10px] font-bold text-white">
              !
            </span>
          )}
        </button>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* =================================================
              DESKTOP FILTERS
          ================================================= */}

          <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:block">

            {/* Filter Header */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Filter
                  size={18}
                  className="text-indigo-600"
                />

                <h2 className="font-bold text-slate-900">
                  Filters
                </h2>

              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Clear
                </button>
              )}

            </div>

            {/* =================================================
                CATEGORY
            ================================================= */}

            <div className="mt-7">

              <label className="text-sm font-semibold text-slate-800">
                Category
              </label>

              <div className="relative mt-3">

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

            {/* =================================================
                BUDGET
            ================================================= */}

            <div className="mt-7">

              <label className="text-sm font-semibold text-slate-800">
                Budget
              </label>

              <div className="relative mt-3">

                <select
                  value={budget}
                  onChange={(e) =>
                    setBudget(e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >

                 <option value="All Budgets">All Budgets</option>
<option value="Under $500">Under $500</option>
<option value="$500 - $1,000">$500 - $1,000</option>
<option value="$1,000 - $2,000">$1,000 - $2,000</option>
<option value="$2,000+">$2,000+</option>

                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

            {/* =================================================
                EXPERIENCE
            ================================================= */}

            <div className="mt-7">

              <label className="text-sm font-semibold text-slate-800">
                Experience Level
              </label>

              <div className="relative mt-3">

                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >

                  <option value="All Levels">
                    All Levels
                  </option>

                  <option value="Entry">
                    Entry
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Expert">
                    Expert
                  </option>

                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

            {/* Active Filter Summary */}
            {hasFilters && (
              <div className="mt-7 rounded-xl bg-indigo-50 p-4">

                <p className="text-xs font-semibold text-indigo-700">
                  Active Filters
                </p>

                <div className="mt-3 space-y-2 text-xs text-indigo-600">

                  {search && (
                    <p>
                      Search:{" "}
                      <span className="font-semibold">
                        {search}
                      </span>
                    </p>
                  )}

                  {category !== "All Categories" && (
                    <p>
                      Category:{" "}
                      <span className="font-semibold">
                        {category}
                      </span>
                    </p>
                  )}

                  {budget !== "All Budgets" && (
                    <p>
                      Budget:{" "}
                      <span className="font-semibold">
                        {budget}
                      </span>
                    </p>
                  )}

                  {experience !== "All Levels" && (
                    <p>
                      Level:{" "}
                      <span className="font-semibold">
                        {experience}
                      </span>
                    </p>
                  )}

                </div>

              </div>
            )}

          </aside>

          {/* =================================================
              PROJECT RESULTS
          ================================================= */}

          <div>

            {/* Results Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Available Projects
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredProjects.length}{" "}
                  {filteredProjects.length === 1
                    ? "project"
                    : "projects"}{" "}
                  found
                </p>

              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-2 self-start text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  <X size={16} />
                  Clear filters
                </button>
              )}

            </div>

            {/* =================================================
                PROJECT CARDS
            ================================================= */}

            {filteredProjects.length > 0 ? (

              <div className="grid gap-6 xl:grid-cols-2">

                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}

              </div>

            ) : (

              /* =================================================
                  EMPTY SEARCH STATE
              ================================================= */

              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">

                  <Search
                    size={27}
                    className="text-indigo-600"
                  />

                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  No Projects Found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn't find any projects matching
                  your current search and filter options.
                  Try changing your filters or search for
                  something else.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Reset Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* =================================================
          MOBILE FILTER DRAWER
      ================================================= */}

      {mobileFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* Overlay */}
          <div
            onClick={() => setMobileFilters(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">

            {/* Drawer Header */}
            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Filters
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Refine your project search
                </p>

              </div>

              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X size={19} />
              </button>

            </div>

            <div className="mt-7 space-y-6">

              {/* Category */}
              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>

              {/* Budget */}
              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Budget
                </label>

                <select
                  value={budget}
                  onChange={(e) =>
                    setBudget(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >

                  <option value="All Budgets">All Budgets</option>
<option value="Under $500">Under $500</option>
<option value="$500 - $1,000">$500 - $1,000</option>
<option value="$1,000 - $2,000">$1,000 - $2,000</option>
<option value="$2,000+">$2,000+</option>

                </select>

              </div>

              {/* Experience */}
              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Experience Level
                </label>

                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >

                  <option value="All Levels">
                    All Levels
                  </option>

                  <option value="Entry">
                    Entry
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Expert">
                    Expert
                  </option>

                </select>

              </div>

            </div>

            {/* Mobile Actions */}
            <div className="mt-8 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Show {filteredProjects.length}{" "}
                {filteredProjects.length === 1
                  ? "Project"
                  : "Projects"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

export default Projects;