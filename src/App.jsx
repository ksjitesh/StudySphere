import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Syllabus from "./pages/Syllabus";
import Semester from "./pages/Semester";
import Subjects from "./pages/Subjects";
import Subject from "./pages/Subject";
import Notes from "./pages/Notes";
import PYQs from "./pages/PYQs";
import Assignments from "./pages/Assignments";
import Projects from "./pages/Projects";
import SubjectSyllabus from "./pages/SubjectSyllabus";
import SearchPage from "./pages/Search";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ManageNotes from "./pages/ManageNotes";
import NotFound from "./pages/NotFound";

function AppContent() {

  const location = useLocation();

  const { currentUser } = useAuth();

  const authPages = [
    "/login",
    "/signup",
    "/forgot-password",
  ];

  const hideLayout =
    authPages.includes(location.pathname);

  return (

    <>

      {!hideLayout && <Navbar />}

      <Routes>
                {/* Home */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Syllabus */}

        <Route
          path="/syllabus"
          element={
            <ProtectedRoute>
              <Syllabus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/syllabus/semester/:semesterId"
          element={
            <ProtectedRoute>
              <Semester />
            </ProtectedRoute>
          }
        />

        <Route
          path="/syllabus/semester/:semesterId/:subjectSlug"
          element={
            <ProtectedRoute>
              <SubjectSyllabus />
            </ProtectedRoute>
          }
        />

        {/* Resources */}

        <Route
          path="/semester/:semesterId"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug"
          element={
            <ProtectedRoute>
              <Subject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/pyqs"
          element={
            <ProtectedRoute>
              <PYQs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/assignments"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* Search */}

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
                {/* Authentication */}

        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/signup"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <Signup />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            currentUser ? (
              <Navigate to="/" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
<Route
  path="/admin/notes"
  element={
    <AdminRoute>
      <ManageNotes />
    </AdminRoute>
  }
/>
<Route
  path="*"
  element={<NotFound />}
/>

      </Routes>

      {!hideLayout && <Footer />}
          </>

  );

}

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );

}

export default App;