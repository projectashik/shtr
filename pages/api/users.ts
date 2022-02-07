import handler from "lib/handler";
import prisma from "lib/db";
import { badRequest, ok, unauthorized } from "lib/response";
import { useAuth, useMustBeAdmin } from "lib/middleware";
import { hashPassword } from "lib/crypto";

handler.get(async (req, res) => {
  await useAuth(req, res);
  try {
    const { is_admin } = req.auth;
    if (is_admin) {
      const users = await prisma.user.findMany({
        orderBy: {
          created_at: "desc",
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
  await useAuth(req, res);
  try {
    if (req.auth?.is_admin as boolean) {
      const { username, password } = req.body;
      if (!username || !password) {
        return badRequest(res, "Username and password is required.");
      }
      let user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        let hashedPassword = hashPassword(password);
        const user = await prisma.user.create({
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
