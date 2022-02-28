import { serialize } from "cookie";
import { AUTH_COOKIE_NAME } from "lib/constants";
import { checkPassword, createSecureToken } from "lib/crypto";
import prisma from "lib/db";
import { badRequest, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return badRequest(res, "Missing username or password");
  }

  try {
    const user = await prisma?.account.findUnique({
      where: {
        username,
      },
    });

    if (user && (await checkPassword(password, user.password))) {
      const { user_id, username, is_admin } = user;
      const token = await createSecureToken({ user_id, username, is_admin });
      const cookie = serialize(AUTH_COOKIE_NAME, token, {
        path: "/",
        httpOnly: true,
        sameSite: true,
        maxAge: 60 * 60 * 24 * 30,
      });
      res.setHeader("Set-Cookie", [cookie]);
      return ok(res, { token });
    } else {
      return badRequest(res, "error.invalidCredentials");
    }
  } catch (e) {
    return badRequest(res, "error.invalidCredentials");
  }
};
export default handler;
