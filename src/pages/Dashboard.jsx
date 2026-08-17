import { useEffect, useState } from "react";
import { defaultNotifications } from "../data/notifications";
import {
  Activity,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Save,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";

import {
  postedProjects,
  recentActivity,
  submittedProposals,
} from "../data/dashboardData";
import Messages from "./Messages";
import { Link } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
  const savedNotifications = localStorage.getItem(
    "freelanceNotifications"
  );

  if (savedNotifications) {
    return JSON.parse(savedNotifications);
  }

  return defaultNotifications;
});

const unreadCount = notifications.filter(
  (notification) => !notification.read
).length;

const markAsRead = (id) => {
  const updatedNotifications = notifications.map((notification) =>
    notification.id === id
      ? { ...notification, read: true }
      : notification
  );

  setNotifications(updatedNotifications);

  localStorage.setItem(
    "freelanceNotifications",
    JSON.stringify(updatedNotifications)
  );
};

const markAllAsRead = () => {
  const updatedNotifications = notifications.map((notification) => ({
    ...notification,
    read: true,
  }));

  setNotifications(updatedNotifications);

  localStorage.setItem(
    "freelanceNotifications",
    JSON.stringify(updatedNotifications)
  );
};

const [notificationOpen, setNotificationOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
  const savedSettings = localStorage.getItem("freelanceSettings");

  return savedSettings
    ? JSON.parse(savedSettings)
    : {
        emailNotifications: true,
        projectAlerts: true,
        messageNotifications: true,
        proposalUpdates: true,
        darkMode: false,
      };
});

  // =====================================================
  // PROJECTS
  // =====================================================

  const [dashboardProjects, setDashboardProjects] = useState(() => {
    const savedProjects = localStorage.getItem("freelanceProjects");

    return savedProjects
      ? JSON.parse(savedProjects)
      : postedProjects;
  });

  // =====================================================
  // PROPOSALS
  // =====================================================

  const [dashboardProposals, setDashboardProposals] = useState(() => {
    const savedProposals = localStorage.getItem("freelanceProposals");

    return savedProposals
      ? JSON.parse(savedProposals)
      : submittedProposals;
  });

  // =====================================================
  // PROFILE DATA
  // =====================================================

  const defaultProfile = {
    name: "Vanshika Khandelwal",
    title: "Full Stack Developer",
    email: "vanshika@example.com",
    location: "Rajasthan, India",
    experience: "Intermediate",
    hourlyRate: "25",
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
      "Express.js",
    ],
    image: "https://i.pravatar.cc/300?img=49",
  };

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("freelanceProfile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : defaultProfile;
  });

  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [profileForm, setProfileForm] = useState(() => {
    const savedProfile = localStorage.getItem("freelanceProfile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : defaultProfile;
  });

  // =====================================================
  // STORAGE SYNC
  // =====================================================

  useEffect(() => {
    const handleStorageChange = () => {
      const savedProjects =
        localStorage.getItem("freelanceProjects");

      const savedProposals =
        localStorage.getItem("freelanceProposals");

      const savedProfile =
        localStorage.getItem("freelanceProfile");

      if (savedProjects) {
        setDashboardProjects(JSON.parse(savedProjects));
      }

      if (savedProposals) {
        setDashboardProposals(JSON.parse(savedProposals));
      }

      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile(parsedProfile);
        setProfileForm(parsedProfile);
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const navigation = [
    {
      name: "Overview",
      icon: LayoutDashboard,
    },
    {
      name: "My Profile",
      icon: User,
    },
    {
      name: "Posted Projects",
      icon: FolderKanban,
    },
    {
      name: "My Proposals",
      icon: FileText,
    },
    {
      name: "Messages",
      icon: MessageCircle,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  // =====================================================
  // STATUS COLORS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-50 text-blue-700";

      case "In Progress":
        return "bg-amber-50 text-amber-700";

      case "Completed":
        return "bg-emerald-50 text-emerald-700";

      case "Accepted":
        return "bg-emerald-50 text-emerald-700";

      case "Shortlisted":
        return "bg-indigo-50 text-indigo-700";

      case "Under Review":
        return "bg-slate-100 text-slate-700";

      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const handleEditProfile = () => {
    setProfileForm({
      ...profile,
      skills: [...profile.skills],
    });

    setEditProfileOpen(true);
  };

  // =====================================================
  // PROFILE INPUT CHANGE
  // =====================================================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SKILLS CHANGE
  // =====================================================

  const handleSkillsChange = (e) => {
    const skills = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    setProfileForm((prev) => ({
      ...prev,
      skills,
    }));
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...profileForm,
      hourlyRate: String(profileForm.hourlyRate),
    };

    setProfile(updatedProfile);

    localStorage.setItem(
      "freelanceProfile",
      JSON.stringify(updatedProfile)
    );

    setEditProfileOpen(false);
  };

  // =====================================================
  // OVERVIEW
  // =====================================================

  const renderOverview = () => (
    <div className="space-y-8">

      {/* Welcome */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-7 text-white shadow-lg md:p-9">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-indigo-100">
            Welcome back 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Good morning, {profile.name.split(" ")[0]}!
          </h1>

          <p className="mt-3 leading-7 text-indigo-100">
            Manage your projects, track proposals, and connect
            with talented professionals from your dashboard.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Posted Projects */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <FolderKanban
                size={21}
                className="text-indigo-600"
              />
            </div>

            <span className="text-xs font-semibold text-emerald-600">
              +12%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Posted Projects
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {dashboardProjects.length}
          </p>
        </div>

        {/* Proposals */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FileText
                size={21}
                className="text-blue-600"
              />
            </div>

            <span className="text-xs font-semibold text-emerald-600">
              +8%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Submitted Proposals
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {dashboardProposals.length}
          </p>
        </div>

        {/* Successful Projects */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2
                size={21}
                className="text-emerald-600"
              />
            </div>

            <span className="text-xs font-semibold text-emerald-600">
              92%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Successful Projects
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            18
          </p>
        </div>

        {/* Earnings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <DollarSign
                size={21}
                className="text-amber-600"
              />
            </div>

            <span className="text-xs font-semibold text-emerald-600">
              +18%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Total Earnings
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            $8,450
          </p>
        </div>

      </section>

      {/* Projects + Activity */}
      <section className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">

        {/* Projects */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 p-6">

            <div>
              <h2 className="font-bold text-slate-900">
                Recent Projects
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your latest posted projects
              </p>
            </div>

            <button
              onClick={() => setActiveTab("Posted Projects")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </button>

          </div>

          <div className="divide-y divide-slate-100">

            {dashboardProjects.length === 0 ? (
              <div className="p-10 text-center">
                <FolderKanban
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No projects yet
                </p>

                <Link
                  to="/post-project"
                  className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
                >
                  Post Project
                </Link>
              </div>
            ) : (
              dashboardProjects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="p-6 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                      <span className="text-xs font-semibold text-indigo-600">
                        {project.category}
                      </span>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {project.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

                        <span className="flex items-center gap-1">
                          <DollarSign size={13} />
                          {project.budget}
                        </span>

                        <span className="flex items-center gap-1">
                          <Users size={13} />
                          {project.proposals} proposals
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={13} />
                          {project.deadline}
                        </span>

                      </div>

                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="font-bold text-slate-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your latest account activity
            </p>

          </div>

          <div className="divide-y divide-slate-100">

            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 p-5"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50">
                  <Activity
                    size={16}
                    className="text-indigo-600"
                  />
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-slate-900">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {activity.description}
                  </p>

                  <p className="mt-2 text-[11px] text-slate-400">
                    {activity.time}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>

      </section>
    </div>
  );

  // =====================================================
  // PROFILE
  // =====================================================

  const renderProfile = () => (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your freelancer profile and professional information.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600" />

        <div className="px-6 pb-7 md:px-8">

          <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

              <img
                src={profile.image}
                alt={profile.name}
                className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
              />

              <div className="pb-1">

                <h2 className="text-2xl font-bold text-slate-900">
                  {profile.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {profile.title}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={handleEditProfile}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Edit Profile
            </button>

          </div>

          {/* Profile Information */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs text-slate-400">
                Email
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {profile.email}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs text-slate-400">
                Location
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {profile.location}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs text-slate-400">
                Experience
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {profile.experience}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs text-slate-400">
                Hourly Rate
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                ${profile.hourlyRate} / hour
              </p>
            </div>

          </div>

          {/* Skills */}
          <div className="mt-6">

            <h3 className="font-bold text-slate-900">
              Skills
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">

              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>
      </section>
    </div>
  );

  // =====================================================
  // POSTED PROJECTS
  // =====================================================

  const renderPostedProjects = () => (
    <div className="space-y-6">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Posted Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage projects you have posted for freelancers.
          </p>
        </div>

        <Link
          to="/post-project"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + Post New Project
        </Link>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px] text-left">

            <thead className="border-b border-slate-100 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Project
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Budget
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Proposals
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Deadline
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {dashboardProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16">

                    <div className="flex flex-col items-center justify-center text-center">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                        <FolderKanban
                          size={30}
                          className="text-indigo-600"
                        />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-slate-900">
                        No Projects Posted Yet
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        You haven't posted any projects yet. Create your
                        first project and start receiving proposals from
                        talented freelancers.
                      </p>

                      <Link
                        to="/post-project"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                      >
                        <BriefcaseBusiness size={17} />
                        Post Your First Project
                      </Link>

                    </div>

                  </td>
                </tr>
              ) : (
                dashboardProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {project.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {project.category}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                        <DollarSign size={14} />
                        {project.budget}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Users
                          size={15}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-600">
                          {project.proposals}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={15}
                          className="text-slate-400"
                        />

                        <span className="text-sm text-slate-600">
                          {project.deadline}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>

        </div>
      </div>
    </div>
  );

  // =====================================================
  // PROPOSALS
  // =====================================================

  const renderProposals = () => (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Proposals
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track all proposals you have submitted.
          </p>
        </div>

        <Link
          to="/manage-proposals"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Manage Proposals
        </Link>

      </div>

      <div className="grid gap-5">

        {dashboardProposals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <FileText
              size={35}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              No Proposals Yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Start applying to projects to see your proposals here.
            </p>

            <Link
              to="/projects"
              className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Find Projects
            </Link>

          </div>
        ) : (
          dashboardProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >

              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                <div>

                  <p className="text-xs font-semibold text-indigo-600">
                    {proposal.client}
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    {proposal.project}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

                    <span className="flex items-center gap-1">
                      <DollarSign size={13} />
                      ${Number(
                        proposal.expectedBudget
                      ).toLocaleString()}
                    </span>

                    <span>
                      Submitted{" "}
                      {new Date(
                        proposal.submittedAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                </div>

                <span
                  className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${getStatusClass(
                    proposal.status
                  )}`}
                >
                  {proposal.status}
                </span>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
  const renderSettings = () => {
  const updateSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveSettings = () => {
    localStorage.setItem(
      "freelanceSettings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully!");
  };

  const resetSettings = () => {
    const defaultSettings = {
      emailNotifications: true,
      projectAlerts: true,
      messageNotifications: true,
      proposalUpdates: true,
      darkMode: false,
    };

    setSettings(defaultSettings);

    localStorage.setItem(
      "freelanceSettings",
      JSON.stringify(defaultSettings)
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account preferences and notification settings.
        </p>
      </div>

      {/* Account Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">
          <h2 className="font-bold text-slate-900">
            Account Settings
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Manage your account preferences.
          </p>
        </div>

        <div className="divide-y divide-slate-100">

          {/* Email */}
          <div className="flex items-center justify-between gap-5 p-6">

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Email Notifications
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Receive important account updates through email.
              </p>
            </div>

            <button
              type="button"
              onClick={() => updateSetting("emailNotifications")}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings.emailNotifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  settings.emailNotifications
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

          {/* Project Alerts */}
          <div className="flex items-center justify-between gap-5 p-6">

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Project Alerts
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Get notified about new projects and opportunities.
              </p>
            </div>

            <button
              type="button"
              onClick={() => updateSetting("projectAlerts")}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings.projectAlerts
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  settings.projectAlerts
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

          {/* Messages */}
          <div className="flex items-center justify-between gap-5 p-6">

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Message Notifications
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Receive notifications when someone sends you a message.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                updateSetting("messageNotifications")
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings.messageNotifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  settings.messageNotifications
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

          {/* Proposal Updates */}
          <div className="flex items-center justify-between gap-5 p-6">

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Proposal Updates
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Get notified when your proposals are accepted or rejected.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                updateSetting("proposalUpdates")
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings.proposalUpdates
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  settings.proposalUpdates
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

      </section>

      {/* Appearance */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">
          <h2 className="font-bold text-slate-900">
            Appearance
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Customize how your dashboard looks.
          </p>
        </div>

        <div className="p-6">

          <div className="flex items-center justify-between gap-5">

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Dark Mode Preference
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Save your preferred dashboard appearance.
              </p>
            </div>

            <button
              type="button"
              onClick={() => updateSetting("darkMode")}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings.darkMode
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  settings.darkMode
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

      </section>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={resetSettings}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={saveSettings}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
};

  // =====================================================
  // PLACEHOLDER
  // =====================================================

  const renderPlaceholder = () => (
    <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">

      <div className="max-w-md px-6 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Settings
            size={28}
            className="text-indigo-600"
          />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          {activeTab}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This section is ready for the next stage of the
          marketplace functionality.
        </p>

      </div>
    </div>
  );

  // =====================================================
  // CONTENT
  // =====================================================

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return renderOverview();

      case "My Profile":
        return renderProfile();

      case "Posted Projects":
        return renderPostedProjects();

      case "My Proposals":
        return renderProposals();
        case "Settings":
  return renderSettings();

        case "Messages":
  return (
    <div>
      <Messages />
    </div>
  );

      default:
        return renderPlaceholder();
    }
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:hidden">

        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            F
          </div>

          <span className="font-bold text-slate-900">
            FreelanceHub
          </span>

        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100"
        >
          <Menu size={20} />
        </button>

      </header>

      <div className="flex min-h-[calc(100vh-64px)] lg:min-h-screen">

        {/* =====================================================
            DESKTOP SIDEBAR
        ===================================================== */}

        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">

          <div className="flex h-20 items-center border-b border-slate-100 px-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              F
            </div>

            <div className="ml-3">

              <p className="font-bold text-slate-900">
                FreelanceHub
              </p>

              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Dashboard
              </p>

            </div>

          </div>

          <nav className="flex-1 space-y-1 p-4">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    activeTab === item.name
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}

          </nav>

         
        </aside>

        {/* =====================================================
            MOBILE SIDEBAR
        ===================================================== */}

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">

            <div
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-slate-950/50"
            />

            <aside className="relative flex h-full w-72 flex-col bg-white shadow-2xl">

              <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                    F
                  </div>

                  <div>

                    <p className="font-bold text-slate-900">
                      FreelanceHub
                    </p>

                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                      Dashboard
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100"
                >
                  <X size={18} />
                </button>

              </div>

              <nav className="flex-1 space-y-1 p-4">

                {navigation.map((item) => {

                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                        activeTab === item.name
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={18} />
                      {item.name}
                    </button>
                  );
                })}

              </nav>

            </aside>

          </div>
        )}

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="flex-1 overflow-hidden">

          {/* Topbar */}
          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Dashboard
              </p>

              <h2 className="font-bold text-slate-900">
                {activeTab}
              </h2>

            </div>

            <div className="flex items-center gap-5">

              <div className="relative">
  <button
    type="button"
    onClick={() => setNotificationOpen(!notificationOpen)}
    className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
  >
    <Bell size={19} />

    {unreadCount > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    )}
  </button>

  {notificationOpen && (
    <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-bold text-slate-900">
            Notifications
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount > 1 ? "s" : ""
                }`
              : "You're all caught up"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Bell
              size={28}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-700">
              No notifications
            </p>

            <p className="mt-1 text-xs text-slate-400">
              You're all caught up.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              type="button"
              onClick={() => markAsRead(notification.id)}
              className={`flex w-full gap-3 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 ${
                !notification.read ? "bg-indigo-50/40" : "bg-white"
              }`}
            >
              {/* Notification Icon */}
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  !notification.read
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <Bell size={16} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-sm ${
                      !notification.read
                        ? "font-bold text-slate-900"
                        : "font-semibold text-slate-700"
                    }`}
                  >
                    {notification.title}
                  </p>

                  {!notification.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
                  )}
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {notification.message}
                </p>

                <p className="mt-2 text-[11px] text-slate-400">
                  {notification.time}
                </p>
              </div>
            </button>
          ))
        )}
      </div>

    </div>
  )}
</div>

              

            </div>

          </div>

          <div className="p-5 md:p-8">
            {renderContent()}
          </div>

        </section>

      </div>

      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {editProfileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Edit Profile
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update your professional information.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setEditProfileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <X size={19} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSaveProfile}
              className="space-y-6 p-6"
            >

              {/* Name + Title */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Professional Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={profileForm.title}
                    onChange={handleProfileChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

              </div>

              {/* Email + Location */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={profileForm.location}
                    onChange={handleProfileChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

              </div>

              {/* Experience + Rate */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Experience
                  </label>

                  <select
                    name="experience"
                    value={profileForm.experience}
                    onChange={handleProfileChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="Beginner">
                      Beginner
                    </option>

                    <option value="Intermediate">
                      Intermediate
                    </option>

                    <option value="Experienced">
                      Experienced
                    </option>

                    <option value="Expert">
                      Expert
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Hourly Rate ($)
                  </label>

                  <input
                    type="number"
                    name="hourlyRate"
                    min="1"
                    value={profileForm.hourlyRate}
                    onChange={handleProfileChange}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

              </div>

              {/* Skills */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Skills
                </label>

                <input
                  type="text"
                  value={profileForm.skills.join(", ")}
                  onChange={handleSkillsChange}
                  placeholder="React, Node.js, MongoDB"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Separate skills with commas.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  {profileForm.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}

                </div>
              </div>

              {/* Profile Image */}
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Profile Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={profileForm.image}
                  onChange={handleProfileChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Save size={17} />
                  Save Changes
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}

export default Dashboard;