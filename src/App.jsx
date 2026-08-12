import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ManageNotes from "./pages/ManageNotes";

import NotFound from "./pages/NotFound";

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Syllabus */}

        <Route
          path="/syllabus"
          element={<Syllabus />}
        />

        <Route
          path="/syllabus/semester/:semesterId"
          element={<Semester />}
        />

        <Route
          path="/syllabus/semester/:semesterId/:subjectSlug"
          element={<SubjectSyllabus />}
        />

        {/* Resources */}

        <Route
          path="/semester/:semesterId"
          element={<Subjects />}
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug"
          element={<Subject />}
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/notes"
          element={<Notes />}
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/pyqs"
          element={<PYQs />}
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/assignments"
          element={<Assignments />}
        />

        <Route
          path="/semester/:semesterId/subject/:subjectSlug/projects"
          element={<Projects />}
        />

        {/* Search */}

        <Route
          path="/search"
          element={<SearchPage />}
        />

        {/* Admin */}

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

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />
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