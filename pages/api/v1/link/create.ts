import { verifyKey } from "lib/crypto";
import prisma from "lib/db";
import { makeSlug } from "lib/helper";
import { use_Cors } from "lib/middleware";
import { badRequest, methodNotAllowed, ok, unauthorized } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_Cors(req, res);
  if (req.method === "POST") {
    if (req.headers["api-key"]) {
      const apiKey = req.headers["api-key"];
      try {
        const api = await verifyKey(apiKey as string);
        if (api) {
          const { url } = req.body;
          const newLink = await prisma?.link.create({
            data: {
              url,
              slug: makeSlug(),
              user_id: api.user_id,
            },
          });
          return ok(res, newLink);
        } else {
          console.log("Bad 1");
          return badRequest(res, "Something went wrong");
        }
      } catch (e) {
        console.log(e);
        return badRequest(res, "Something went wrong");
      }
    } else {
      console.log("Unauthorized");
      return unauthorized(res);
    }
  } else {
    console.log("no allowd");
    return methodNotAllowed(res);
  }
};

export default handler;
