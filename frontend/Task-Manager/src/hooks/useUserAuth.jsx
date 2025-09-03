import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // ✅ make sure path is correct

export const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext); // ✅ fixed
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // wait until loading finishes
    if (!user) {
      clearUser();
      navigate("/login");
    }
  }, [user, loading, clearUser, navigate]);

  return { user, loading, clearUser }; // ✅ return values so components can use them
};
