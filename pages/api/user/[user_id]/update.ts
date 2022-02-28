import { checkPassword, hashPassword } from "lib/crypto";
import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok, unauthorized } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "POST") {
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
          return badRequest(res, "error.usernameUnique");
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
                return badRequest(res, "error.somethingWrong");
              }
            } else {
              return badRequest(res, "error.currentPasswordIncorrect");
            }
          } else {
            return badRequest(res, "error.noUser");
          }
        } else {
          return badRequest(res, "Password doesn't match.");
        }
      }
    } else {
      return unauthorized(res);
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
