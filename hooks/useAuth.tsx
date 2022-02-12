import axios from "axios";
import { useAtom } from "jotai";
import { toast } from "lib/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userAtom } from "states/atoms";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(!user);
  const [isAuthenticated, setIsAuthenticated] = useState(user !== null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      return;
    }
    loadUser();

    if (!user) {
      router.push("/login");
    }
  }, [user, loading]);

  async function loadUser() {
    setLoading(true);
    try {
      const res = await axios.get("/api/auth/verify");
      if (res.data) {
        setUser(res.data.auth);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }

  async function logout() {
    const res = await axios.post("/api/auth/logout");
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      toast({ message: "Logged out successfully" });
    }
  }

  return { user, isAuthenticated, loading, logout };
};

export default useAuth;
