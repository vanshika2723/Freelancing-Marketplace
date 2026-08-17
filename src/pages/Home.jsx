import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FileText,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";

function Home() {
  const categories = [
    {
      title: "Web Development",
      description: "Build modern websites and web applications.",
      icon: Code2,
      projects: "1,240+ Projects",
    },
    {
      title: "Graphic Design",
      description: "Creative designs for brands and businesses.",
      icon: Palette,
      projects: "890+ Projects",
    },
    {
      title: "Content Writing",
      description: "Engaging content that connects with audiences.",
      icon: FileText,
      projects: "760+ Projects",
    },
    {
      title: "Digital Marketing",
      description: "Grow brands with powerful marketing strategies.",
      icon: Megaphone,
      projects: "620+ Projects",
    },
  ];

  const projects = [
    {
      title: "Build a Modern React Website",
      category: "Web Development",
      budget: "$800 - $1,500",
      description:
        "Looking for an experienced React developer to build a responsive business website.",
      skills: ["React", "Tailwind CSS", "JavaScript"],
      client: "TechNova",
      proposals: 12,
    },
    {
      title: "Brand Identity & Logo Design",
      category: "Graphic Design",
      budget: "$300 - $600",
      description:
        "Need a creative designer to create a complete brand identity for a growing startup.",
      skills: ["Figma", "Illustrator", "Branding"],
      client: "Bloom Studio",
      proposals: 8,
    },
    {
      title: "SEO Blog Content Writer",
      category: "Content Writing",
      budget: "$200 - $450",
      description:
        "Looking for a skilled writer who can create SEO-friendly articles for our website.",
      skills: ["SEO", "Copywriting", "Blog Writing"],
      client: "GrowthHub",
      proposals: 16,
    },
  ];

  const freelancers = [
    {
      name: "Aarav Sharma",
      role: "Full Stack Developer",
      rating: "4.9",
      reviews: 124,
      experience: "5+ Years",
      skills: ["React", "Node.js", "MongoDB"],
      image:
        "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sophia Wilson",
      role: "UI/UX Designer",
      rating: "4.8",
      reviews: 98,
      experience: "4+ Years",
      skills: ["Figma", "UI Design", "UX Research"],
      image:
        "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Daniel Carter",
      role: "Digital Marketing Expert",
      rating: "5.0",
      reviews: 87,
      experience: "6+ Years",
      skills: ["SEO", "Google Ads", "Analytics"],
      image:
        "https://i.pravatar.cc/150?img=68",
    },
  ];

  return (
    <main className="bg-white">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-slate-950">

        {/* Background decoration */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-none w-full px-6 py-20 md:py-28">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              <Zap size={16} className="text-indigo-400" />
              <span>Connect. Collaborate. Create.</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Find the right talent.
              <br />

              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Build something amazing.
              </span>

            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              SkillConnect brings talented freelancers and ambitious
              businesses together. Find experts, discover exciting projects,
              and turn ideas into reality.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row">

              <div className="flex flex-1 items-center gap-3 px-3">
                <Search
                  size={21}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search for projects, skills or freelancers..."
                  className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <button className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Search
              </button>

            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <Link
                to="/projects"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
              >
                Explore Projects
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/signup"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
              >
                Become a Freelancer
                <ArrowUpRight size={18} />
              </Link>

            </div>

          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 border-t border-slate-800 pt-10 md:grid-cols-4">

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">
                25K+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Active Freelancers
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">
                12K+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Projects Posted
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">
                98%
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Client Satisfaction
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">
                4.9/5
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Average Rating
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ====================================================== */}
      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-none w-full">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Explore Opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Popular Categories
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Find skilled professionals across the most popular freelance
                categories.
              </p>
            </div>

            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all categories
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <Link
                  to="/projects"
                  key={category.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>

                  <p className="mt-5 text-xs font-semibold text-indigo-600">
                    {category.projects}
                  </p>

                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PROJECTS
      ====================================================== */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-none w-full">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Latest Opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Featured Projects
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Discover projects from clients looking for talented
                professionals.
              </p>
            </div>

            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Browse all projects
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">

            {projects.map((project) => (
              <div
                key={project.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between gap-4">

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {project.category}
                  </span>

                  <button className="text-slate-400 transition hover:text-indigo-600">
                    <ArrowUpRight size={20} />
                  </button>

                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

                <div className="my-6 border-t border-slate-100" />

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-slate-400">
                      Budget
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {project.budget}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      Proposals
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {project.proposals}
                    </p>
                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <p className="text-sm text-slate-500">
                    By{" "}
                    <span className="font-semibold text-slate-700">
                      {project.client}
                    </span>
                  </p>

                  <Link
                    to="/projects"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    View Project
                  </Link>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED FREELANCERS
      ====================================================== */}
      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-none w-full">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Top Talent
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Featured Freelancers
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Work with experienced professionals who deliver high-quality
                results.
              </p>
            </div>

            <Link
              to="/freelancers"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Explore freelancers
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {freelancers.map((freelancer) => (
              <div
                key={freelancer.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start gap-4">

                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-bold text-slate-900">
                      {freelancer.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {freelancer.role}
                    </p>

                    <div className="mt-2 flex items-center gap-1">

                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="text-sm font-semibold text-slate-700">
                        {freelancer.rating}
                      </span>

                      <span className="text-xs text-slate-400">
                        ({freelancer.reviews} reviews)
                      </span>

                    </div>

                  </div>

                </div>

                <p className="mt-5 text-sm text-slate-500">
                  Experienced professional with a strong track record of
                  delivering quality work for clients.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                  <div>
                    <p className="text-xs text-slate-400">
                      Experience
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {freelancer.experience}
                    </p>
                  </div>

                  <Link
                    to="/freelancers"
                    className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                  >
                    View Profile
                  </Link>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-none w-full">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              How SkillConnect Works
            </h2>

            <p className="mt-4 text-slate-600">
              Start your freelancing journey in just a few simple steps.
            </p>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="relative text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <Search size={28} />
              </div>

              <span className="mt-5 block text-xs font-bold uppercase tracking-widest text-indigo-600">
                Step 01
              </span>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                Find a Project
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Explore thousands of projects and find opportunities that
                match your skills.
              </p>

            </div>

            <div className="relative text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <BriefcaseBusiness size={28} />
              </div>

              <span className="mt-5 block text-xs font-bold uppercase tracking-widest text-indigo-600">
                Step 02
              </span>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                Submit a Proposal
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Send a professional proposal explaining how you can help the
                client achieve their goals.
              </p>

            </div>

            <div className="relative text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <CheckCircle2 size={28} />
              </div>

              <span className="mt-5 block text-xs font-bold uppercase tracking-widest text-indigo-600">
                Step 03
              </span>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                Get Hired
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Get selected, complete the project, and build your professional
                reputation.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST SECTION
      ====================================================== */}
      <section className="bg-slate-950 px-6 py-20">

        <div className="mx-auto grid max-w-none w-full gap-10 md:grid-cols-2 md:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Why SkillConnect?
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              A better way to connect talent with opportunity.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-400">
              Whether you're a business looking for skilled professionals or
              a freelancer searching for your next opportunity, SkillConnect
              makes the process simple and transparent.
            </p>

            <div className="mt-7 space-y-4">

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <ShieldCheck
                  size={20}
                  className="text-indigo-400"
                />
                Trusted professional marketplace
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Users
                  size={20}
                  className="text-indigo-400"
                />
                Thousands of skilled professionals
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Star
                  size={20}
                  className="text-indigo-400"
                />
                Verified ratings and reviews
              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <Users className="text-indigo-400" size={25} />
              <h3 className="mt-5 text-3xl font-bold text-white">
                25K+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Freelancers
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <BriefcaseBusiness className="text-indigo-400" size={25} />
              <h3 className="mt-5 text-3xl font-bold text-white">
                12K+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Projects
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <Star className="text-indigo-400" size={25} />
              <h3 className="mt-5 text-3xl font-bold text-white">
                4.9/5
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Average Rating
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <Zap className="text-indigo-400" size={25} />
              <h3 className="mt-5 text-3xl font-bold text-white">
                98%
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Satisfaction
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-16 text-center shadow-2xl md:px-12">

          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Ready to take your next big step?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-indigo-100">
            Join thousands of freelancers and businesses building amazing
            things together.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/signup"
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
            >
              Get Started Free
            </Link>

            <Link
              to="/projects"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Explore Projects
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;