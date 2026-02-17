import React, { useEffect, useState } from "react";
import Api from "./Api";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      await Api.get("/api/user/checkAuth")
        .then((res) => {
          setUser(res.data.success);
          //    console.log(res.data);
        })
        .catch((error) => {
          console.error("Error checking authentication:", error);
        });
    } catch (error) {
      setUser(null);
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
