import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";

function ProjectCard({ project }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {project.category}
        </span>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
          Open
        </span>

      </div>

      {/* Title */}
      <h2 className="mt-5 text-xl font-bold leading-7 text-slate-900 transition group-hover:text-indigo-600">
        {project.title}
      </h2>

      {/* Description */}
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
        {project.description}
      </p>

      {/* Skills */}
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

      {/* Divider */}
      <div className="my-6 border-t border-slate-100" />

      {/* Budget */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs text-slate-400">
            Budget
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ${project.budget.toLocaleString()}
          </p>

          <p className="text-xs text-slate-400">
            {project.budgetType}
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

      {/* Client */}
      <div className="mt-6 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
          {project.client.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">

          <p className="truncate text-sm font-semibold text-slate-800">
            {project.client}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">

            <Star
              size={13}
              className="fill-yellow-400 text-yellow-400"
            />

            {project.clientRating}

            <span>•</span>

            <MapPin size={12} />

            {project.clientLocation}

          </div>

        </div>

      </div>

      {/* Deadline */}
      <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">

        <CalendarDays size={15} />

        Deadline:

        <span className="font-semibold text-slate-700">
          {project.deadline}
        </span>

      </div>

      {/* Button */}
      <Link
        to={`/projects/${project.id}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
      >
        View Project
        <ArrowUpRight size={17} />
      </Link>

    </article>
  );
}

export default ProjectCard;