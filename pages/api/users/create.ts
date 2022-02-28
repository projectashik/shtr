import { hashPassword } from "lib/crypto";
import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok, unauthorized } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "POST") {
    await use_auth(req, res);
    try {
      if (req.auth?.is_admin as boolean) {
        const { username, password } = req.body;
        if (!username || !password) {
          return badRequest(res, "Username and password is required.");
        }
        let user = await prisma.account.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          let hashedPassword = hashPassword(password);
          const user = await prisma.account.create({
            data: {
              username,
              password: hashedPassword,
            },
          });

          return ok(res, user);
        } else {
          return badRequest(res, "User already exists");
        }
      } else {
        return unauthorized(res);
      }
    } catch (e: any) {
      return badRequest(res, e.message);
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
