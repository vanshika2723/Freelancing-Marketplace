import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  UserRound,
  BriefcaseBusiness,
  FileText,
  LogOut,
} from "lucide-react";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenu(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
            <BriefcaseBusiness size={23} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Skill<span className="text-indigo-600">Connect</span>
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Work. Connect. Grow.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
       <nav className="hidden items-center gap-7 lg:flex">
  <Link
    to="/"
    className="text-sm font-medium text-slate-700 hover:text-indigo-600"
  >
    Home
  </Link>

  <Link
    to="/projects"
    className="text-sm font-medium text-slate-700 hover:text-indigo-600"
  >
    Find Projects
  </Link>

  <Link
    to="/freelancers"
    className="text-sm font-medium text-slate-700 hover:text-indigo-600"
  >
    Freelancers
  </Link>

  {user && (
    <>
      <Link
        to="/dashboard"
        className="text-sm font-medium text-slate-700 hover:text-indigo-600"
      >
        Dashboard
      </Link>

      <Link
        to="/my-proposals"
        className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600"
      >
        <FileText size={16} />
        My Proposals
      </Link>
    </>
  )}
</nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          

          {user ? (
            <>
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.profilePic ||
                    "https://i.pravatar.cc/150?img=12"
                  }
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user.role || "Freelancer"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <UserRound size={18} />
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-slate-200 bg-white p-5 lg:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileMenu(false)}>
              Home
            </Link>

            <Link to="/projects" onClick={() => setMobileMenu(false)}>
              Find Projects
            </Link>

            <Link to="/freelancers" onClick={() => setMobileMenu(false)}>
              Freelancers
            </Link>

           {user && (
  <>
    <Link to="/dashboard" onClick={() => setMobileMenu(false)}>
      Dashboard
    </Link>

    <Link to="/my-proposals" onClick={() => setMobileMenu(false)}>
      My Proposals
    </Link>
  </>
)}

            <hr />

            {user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={
                      user.profilePic ||
                      "https://i.pravatar.cc/150?img=12"
                    }
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />

                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-slate-500">
                      {user.role || "Freelancer"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 px-4 py-3 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-3 font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;