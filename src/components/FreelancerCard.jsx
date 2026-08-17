import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Star,
} from "lucide-react";

function FreelancerCard({ freelancer }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

      {/* Profile */}
      <div className="flex items-start gap-4">

        <img
          src={freelancer.image}
          alt={freelancer.name}
          className="h-16 w-16 rounded-2xl object-cover ring-4 ring-slate-50"
        />

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <div>
              <h2 className="font-bold text-slate-900 group-hover:text-indigo-600">
                {freelancer.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {freelancer.title}
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
              Available
            </span>

          </div>

        </div>

      </div>

      {/* Location + Rating */}
      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-500">

        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {freelancer.location}
        </span>

        <span className="flex items-center gap-1.5">
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <strong className="text-slate-700">
            {freelancer.rating}
          </strong>

          ({freelancer.reviews})
        </span>

      </div>

      {/* Bio */}
      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-500">
        {freelancer.bio}
      </p>

      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">

        {freelancer.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {skill}
          </span>
        ))}

        {freelancer.skills.length > 4 && (
          <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
            +{freelancer.skills.length - 4}
          </span>
        )}

      </div>

      {/* Divider */}
      <div className="my-6 border-t border-slate-100" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">

        <div>

          <p className="text-xs text-slate-400">
            Hourly Rate
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ${freelancer.hourlyRate}
            <span className="text-xs font-normal text-slate-400">
              /hr
            </span>
          </p>

        </div>

        <div>

          <p className="text-xs text-slate-400">
            Completed
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-lg font-bold text-slate-900">
            <BriefcaseBusiness
              size={17}
              className="text-indigo-600"
            />
            {freelancer.completedProjects}
          </p>

        </div>

      </div>

      {/* Button */}
      <Link
        to={`/freelancers/${freelancer.id}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
      >
        View Profile
        <ArrowUpRight size={17} />
      </Link>

    </article>
  );
}

export default FreelancerCard;