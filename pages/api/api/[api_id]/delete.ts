import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_auth(req, res);
  if (req.method === "DELETE") {
    const { api_id } = req.query;
    const { is_admin, user_id } = req.auth;
    console.log(is_admin);
    try {
      const api = await prisma.api.findFirst({
        where: {
          api_id: +api_id,
        },
      });

      if (api?.user_id === user_id || is_admin) {
        try {
          const deleteApi = await prisma.api.delete({
            where: {
              api_id: +api_id,
            },
          });

          return ok(res, {
            msg: "Api removed successfully.",
          });
        } catch (e) {
          console.log(e);
          return badRequest(res, "Error deleting api");
        }
      } else {
        return badRequest(res, "Unauthorized");
      }
    } catch (e) {
      return badRequest(res, "Api Not Found");
    }
  }
};

export default handler;
