import { checkPassword, createSecureToken } from "lib/crypto";
import { badRequest, ok } from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { AUTH_COOKIE_NAME } from "lib/constants";
import prisma from "lib/db";
import handler from "lib/handler";

handler.post(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return badRequest(res, "Missing username or password");
  }

  try {
    const user = await prisma?.user.findUnique({
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
        maxAge: 60 * 60 * 24 * 30,
      });
      res.setHeader("Set-Cookie", [cookie]);
      return ok(res, { token });
    } else {
      return badRequest(res, "Invalid username or password");
    }
  } catch (e) {
    console.log(e);
    return badRequest(res, "Invalid username or password");
  }
});
export default handler;
