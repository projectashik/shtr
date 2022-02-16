import prisma from "lib/db";
import { badRequest, ok } from "lib/response";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { user_id } = req.query;
    try {
      const user = await prisma.user.findFirst({
        where: {
          user_id: +user_id,
        },
      });
      if (user?.is_admin) {
        return badRequest(res, "Cannot remove admin");
      }
      try {
        const deletedUser = await prisma.user.delete({
          where: {
            user_id: +user_id,
          },
        });

        return ok(res, {
          msg: "User removed successfully.",
        });
      } catch (e) {
        console.log(e);
        return badRequest(res, "Error deleting user");
      }
    } catch (e) {
      return badRequest(res, "User Not Found");
    }
  }
};

export default handler;
