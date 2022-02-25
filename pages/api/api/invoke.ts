import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";
import { v4 } from "uuid";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "POST") {
    await use_auth(req, res);
    const { user_id } = req.auth;
    const { name } = req.body;
    try {
      const key = v4();
      const api = await prisma.api.create({
        data: {
          key,
          user_id: user_id,
          name,
        },
      });
      return ok(res, {
        msg: "Successfully invoked the api",
        key,
      });
    } catch (e: any) {
      return badRequest(res, "Error invoking api key");
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
