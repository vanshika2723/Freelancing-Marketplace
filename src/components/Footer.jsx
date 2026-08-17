import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
 
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-none w-full px-6 py-16">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <Link to="/" className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <BriefcaseBusiness size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Skill<span className="text-indigo-400">Connect</span>
                </h2>

                <p className="text-xs text-slate-500">
                  Work. Connect. Grow.
                </p>
              </div>

            </Link>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Connect with talented freelancers and discover exciting
              opportunities. Build projects, grow your skills, and create
              meaningful professional connections.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>

            </div>
          </div>

          {/* Marketplace */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Marketplace
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/projects"
                  className="transition hover:text-indigo-400"
                >
                  Find Projects
                </Link>
              </li>

              <li>
                <Link
                  to="/freelancers"
                  className="transition hover:text-indigo-400"
                >
                  Find Freelancers
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="transition hover:text-indigo-400"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Categories
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  How It Works
                </a>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-indigo-400">
                  Help Center
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-indigo-400"
                />

                <span>
                  Jaipur, Rajasthan
                  <br />
                  India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-indigo-400"
                />

                <a
                  href="mailto:hello@skillconnect.com"
                  className="transition hover:text-indigo-400"
                >
                  hello@skillconnect.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-indigo-400"
                />

                <a
                  href="tel:+919876543210"
                  className="transition hover:text-indigo-400"
                >
                  +91 98765 43210
                </a>
              </li>

            </ul>

          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-none w-full flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} SkillConnect. All rights reserved.
          </p>

          <p>
            Built with React & Tailwind CSS
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;