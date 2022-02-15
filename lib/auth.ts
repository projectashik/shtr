import axios from "axios";
import { parse } from "cookie";
import { toast } from "lib/toast";
import { NextApiRequest } from "next";
import { AUTH_COOKIE_NAME } from "./constants";
import { parseSecureToken } from "./crypto";

export async function getAuthToken(req: NextApiRequest) {
  const token = parse(req.headers.cookie || "")[AUTH_COOKIE_NAME];

  return parseSecureToken(token);
}

export async function logout() {
  const res = await axios.post("/api/auth/logout");
  toast({ message: "Logged out successfully" });
  window.location.href = "/login";
}
