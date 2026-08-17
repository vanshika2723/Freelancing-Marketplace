import { useMemo, useState } from "react";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import FreelancerCard from "../components/FreelancerCard";
import freelancers from "../data/freelancers";

function Freelancers() {
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("All Levels");
  const [rate, setRate] = useState("All Rates");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filteredFreelancers = useMemo(() => {
    return freelancers.filter((freelancer) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        freelancer.name.toLowerCase().includes(searchText) ||
        freelancer.title.toLowerCase().includes(searchText) ||
        freelancer.bio.toLowerCase().includes(searchText) ||
        freelancer.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesExperience =
        experience === "All Levels" ||
        freelancer.experience === experience;

      const matchesRate =
        rate === "All Rates" ||
        (rate === "Under $25/hr" &&
          freelancer.hourlyRate < 25) ||
        (rate === "$25 - $35/hr" &&
          freelancer.hourlyRate >= 25 &&
          freelancer.hourlyRate <= 35) ||
        (rate === "$35+/hr" &&
          freelancer.hourlyRate > 35);

      return (
        matchesSearch &&
        matchesExperience &&
        matchesRate
      );
    });
  }, [search, experience, rate]);

  const clearFilters = () => {
    setSearch("");
    setExperience("All Levels");
    setRate("All Rates");
  };

  const hasFilters =
    search ||
    experience !== "All Levels" ||
    rate !== "All Rates";

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
  <section className="bg-slate-950 px-6 py-20">

  <div className="mx-auto max-w-5xl text-center">

    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
      Discover Talent
    </p>

    <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
      Find the Right Freelancer
    </h1>

    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
      Connect with skilled professionals who can help turn your
      ideas into successful projects.
    </p>

    {/* Search */}
    <div className="mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-2xl bg-white p-2 shadow-xl">

      <Search
        size={21}
        className="ml-3 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search freelancers, skills or expertise..."
        className="flex-1 bg-transparent px-2 py-3 text-sm text-slate-800 outline-none"
      />

    </div>

  </div>

</section>

      {/* Content */}
      <section className="mx-auto max-w-none w-full px-6 py-10">

        {/* Mobile Filter */}
        <button
          onClick={() => setMobileFilters(true)}
          className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 lg:hidden"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Sidebar */}
          <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:block">

            <div className="flex items-center justify-between">

              <h2 className="font-bold text-slate-900">
                Filters
              </h2>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-indigo-600"
                >
                  Clear
                </button>
              )}

            </div>

            {/* Experience */}
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
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-indigo-500"
                >
                  <option>All Levels</option>
                  <option>Entry</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

            {/* Rate */}
            <div className="mt-7">

              <label className="text-sm font-semibold text-slate-800">
                Hourly Rate
              </label>

              <div className="relative mt-3">

                <select
                  value={rate}
                  onChange={(e) =>
                    setRate(e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-indigo-500"
                >
                  <option>All Rates</option>
                  <option>Under $25/hr</option>
                  <option>$25 - $35/hr</option>
                  <option>$35+/hr</option>
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

          </aside>

          {/* Results */}
          <div>

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Top Freelancers
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredFreelancers.length} professionals found
                </p>

              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 self-start text-sm font-semibold text-indigo-600"
                >
                  <X size={16} />
                  Clear filters
                </button>
              )}

            </div>

            {filteredFreelancers.length > 0 ? (

              <div className="grid gap-6 xl:grid-cols-2">

                {filteredFreelancers.map(
                  (freelancer) => (
                    <FreelancerCard
                      key={freelancer.id}
                      freelancer={freelancer}
                    />
                  )
                )}

              </div>

            ) : (

              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Search
                    size={24}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  No freelancers found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching for another skill or changing the filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Reset Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* Mobile Filter Drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            onClick={() => setMobileFilters(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-900">
                Filters
              </h2>

              <button
                onClick={() => setMobileFilters(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
              >
                <X size={19} />
              </button>

            </div>

            <div className="mt-6 space-y-5">

              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Experience Level
                </label>

                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                >
                  <option>All Levels</option>
                  <option>Entry</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>

              </div>

              <div>

                <label className="text-sm font-semibold text-slate-800">
                  Hourly Rate
                </label>

                <select
                  value={rate}
                  onChange={(e) =>
                    setRate(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none"
                >
                  <option>All Rates</option>
                  <option>Under $25/hr</option>
                  <option>$25 - $35/hr</option>
                  <option>$35+/hr</option>
                </select>

              </div>

            </div>

            <button
              onClick={() => setMobileFilters(false)}
              className="mt-7 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Apply Filters
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

export default Freelancers;