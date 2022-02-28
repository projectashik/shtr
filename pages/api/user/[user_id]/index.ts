import prisma from "lib/db";
import { badRequest, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "GET") {
    let { user_id } = req.query;
    try {
      const user = await prisma.account.findUnique({
        where: {
          user_id: +user_id,
        },
      });
      return ok(res, user);
    } catch (e) {
      return badRequest(res, "Something went wrong");
    }
  }
};
export default handler;
