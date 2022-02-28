import { hashPassword } from "lib/crypto";
import prisma from "lib/db";
import handler from "lib/handler";
import { use_auth } from "lib/middleware";
import { badRequest, ok, unauthorized } from "lib/response";

handler.get(async (req, res) => {
  await use_auth(req, res);
  try {
    const { is_admin } = req.auth;
    if (is_admin) {
      const users = await prisma.account.findMany({
        orderBy: {
          created_at: "asc",
        },
      });
      return ok(res, users);
    } else {
      return unauthorized(res);
    }
  } catch (e: any) {
    return badRequest(res, "");
  }
});

handler.post(async (req, res) => {
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
});

export default handler;
