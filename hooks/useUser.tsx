import axios from "axios";
import { useAtom } from "jotai";
import { toast } from "lib/toast";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { userAtom } from "states/atoms";

const useUser = () => {
  const [error, setError] = useState<{ [key: string]: string } | null>({});
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const router = useRouter();
  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/auth/verify");
      if (res.data && res.data.auth) {
        setUser(res.data.auth);
        setIsLoading(false);
      }
    } catch (e: any) {
      setError({
        type: "verify",
        message: e.response.data,
      });
      setIsLoading(false);
    }
  }, [setUser]);

  const login = async ({ ...props }: { [key: string]: string }) => {
    setLoginLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        username: props.username,
        password: props.password,
      });
      if (res.data) {
        router.push("/");
        toast({ message: "Login Successful" });
      }
    } catch (e: any) {
      setError({
        type: "login",
        message: e.response.data,
      });
    }
    setLoginLoading(false);
  };

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res.data) {
        setUser(null);
        router.push("/login");
      }
    } catch (e: any) {
      setError({
        type: "logout",
        message: "Error logging out",
      });
    }
  };

  useEffect(() => {
    if (user) return;
    checkSession();
  }, [checkSession, user]);

  return { user, isLoading, error, login, logout, loginLoading };
};

export default useUser;
