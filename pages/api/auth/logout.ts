import { serialize } from "cookie";
import { AUTH_COOKIE_NAME } from "lib/constants";
import handler from "lib/handler";
import { ok } from "lib/response";

handler.post(async (req, res) => {
  const cookie = serialize(AUTH_COOKIE_NAME, "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", [cookie]);
  return ok(res);
});

export default handler;
