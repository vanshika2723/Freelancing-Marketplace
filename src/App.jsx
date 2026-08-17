import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Proposal from "./pages/Proposal";
import Freelancers from "./pages/Freelancers";
import FreelancerProfile from "./pages/FreelancerProfile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import PostProject from "./pages/PostProject";
import ManageProposals from "./pages/ManageProposals";
import MyProposals from "./pages/MyProposals";
import Messages from "./pages/Messages";


function Layout() {
  const location = useLocation();

  // Login aur Signup par Footer nahi dikhana
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/:id/proposal"
          element={<Proposal />}
        />

        <Route
          path="/messages"
          element={<Messages />}
        />

        <Route
          path="/messages/:freelancerId"
          element={<Messages />}
        />

        <Route
          path="/freelancers"
          element={<Freelancers />}
        />

        <Route
          path="/freelancers/:id"
          element={<FreelancerProfile />}
        />


        {/* ================= PROTECTED ROUTES ================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/post-project"
            element={<PostProject />}
          />

          <Route
            path="/manage-proposals"
            element={<ManageProposals />}
          />

          <Route
            path="/my-proposals"
            element={<MyProposals />}
          />

        </Route>

      </Routes>

      {/* Footer conditionally */}
      {!hideFooter && <Footer />}

    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;