import { useEffect, useState } from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../Firebase/firebase";

import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

  const { currentUser } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {

    async function checkAdmin() {

      if (!currentUser) {

        setLoading(false);

        return;

      }

      try {

        const docRef = doc(
          db,
          "users",
          currentUser.uid
        );

        const docSnap =
          await getDoc(docRef);

        if (
          docSnap.exists() &&
          docSnap.data().role === "admin"
        ) {

          setIsAdmin(true);

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    checkAdmin();

  }, [currentUser]);

  if (loading) {

    return (

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
        "
        style={{
          backgroundColor:
            "var(--bg)",
          color:
            "var(--text)",
        }}
      >

        Loading...

      </div>

    );

  }
    if (!currentUser) {

    return <Navigate to="/login" replace />;

  }

  if (!isAdmin) {

    return <Navigate to="/" replace />;

  }

  return children;

}

export default AdminRoute;