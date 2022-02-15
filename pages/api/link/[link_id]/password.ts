import { hashPassword } from "lib/crypto";
import prisma from "lib/db";
import handler from "lib/handler";
import { use_auth } from "lib/middleware";
import { badRequest, ok } from "lib/response";

handler.post(async (req, res) => {
  use_auth(req, res);
  const { password, confirmPassword } = req.body;
  console.log({ password, confirmPassword });
  if (!password || !confirmPassword) {
    console.log("password error 1");
    return badRequest(res, "Password and password confirmation is required");
  }
  if (password !== confirmPassword) {
    console.log("password error 2");
    return badRequest(res, "Passwords do not match");
  }
  try {
    const newPassword = hashPassword(password);
    const { link_id } = req.query;
    const link = await prisma.link.findUnique({
      where: {
        link_id: +link_id,
      },
    });
    if (link) {
      if (req.auth.user_id === link.user_id || req.auth.isAdmin) {
        const isNew = link.password === null;
        try {
          await prisma.link.update({
            where: {
              link_id: +link_id,
            },
            data: {
              password: newPassword,
            },
          });
          if (isNew) {
            return ok(res, {
              msg: "Password set successfully",
            });
          } else {
            return ok(res, {
              msg: "Password updated successfully",
            });
          }
        } catch (e) {
          console.log("Update error", e);
          return badRequest(res, "Something went wrong");
        }
      } else {
        console.log("Authorize error");
        return badRequest(res, "You are not authorized to set password");
      }
    }
    return badRequest(res, "Link not found");
  } catch (e) {
    console.log("Went Wrong error", e);
    return badRequest(res, "Something went wrong");
  }
});

export default handler;
