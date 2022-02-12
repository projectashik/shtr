import handler from "lib/handler";
import prisma from "lib/db";
import { badRequest, ok, unauthorized } from "lib/response";
import { use_auth } from "lib/middleware";
import { checkPassword, hashPassword } from "lib/crypto";

handler.get(async (req, res) => {
  let { user_id } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: +user_id,
      },
    });
    return ok(res, user);
  } catch (e) {
    return badRequest(res, "Something went wrong");
  }
});

handler.post(async (req, res) => {
  await use_auth(req, res);
  const { user_id: current_user_id, is_admin } = req.auth;
  let { user_id } = req.query;
  const { type } = req.body;
  if (user_id === current_user_id || (is_admin as boolean)) {
    if (type === "username") {
      const { username } = req.body;
      try {
        const user = await prisma.user.update({
          where: {
            user_id: +user_id,
          },
          data: {
            username,
          },
        });
        return ok(res, {
          msg: "Username updated successfully.",
        });
      } catch (e: any) {
        return badRequest(res, "Username should be unique");
      }
    } else {
      const { current_password, new_password, confirmation } = req.body;

      if (new_password === confirmation) {
        const userDoesExist = await prisma.user.findUnique({
          where: {
            user_id: +user_id,
          },
        });
        if (userDoesExist) {
          if (checkPassword(current_password, userDoesExist.password)) {
            try {
              const user = await prisma.user.update({
                where: {
                  user_id: +user_id,
                },
                data: {
                  password: hashPassword(new_password),
                },
              });

              return ok(res, {
                msg: "Password updated successfully",
              });
            } catch (e) {
              return badRequest(res, "Something went wrong during ");
            }
          } else {
            return badRequest(res, "Old password doesn't match.");
          }
        } else {
          return badRequest(res, "User doesn't exist");
        }
      } else {
        return badRequest(res, "Password doesn't match.");
      }
    }
  } else {
    return unauthorized(res);
  }
});

export default handler;
