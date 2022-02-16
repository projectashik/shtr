import { serialize } from "cookie";
import { AUTH_COOKIE_NAME } from "lib/constants";
import { ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = (req: NextApiRequestExtended, res: NextApiResponse) => {
  const cookie = serialize(AUTH_COOKIE_NAME, "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  res.setHeader("Set-Cookie", [cookie]);
  return ok(res);
};

export default handler;
