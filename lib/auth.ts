import { parse } from "cookie";
import { NextApiRequest } from "next";
import { AUTH_COOKIE_NAME } from "./constants";
import { parseSecureToken } from "./crypto";

export async function getAuthToken(req: NextApiRequest) {
  const token = parse(req.headers.cookie || "")[AUTH_COOKIE_NAME];

  return parseSecureToken(token);
}
