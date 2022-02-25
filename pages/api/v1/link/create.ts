import { verifyKey } from "lib/crypto";
import { makeSlug } from "lib/helper";
import { badRequest, methodNotAllowed, ok, unauthorized } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
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
          return badRequest(res, "Something went wrong");
        }
      } catch (e) {
        return badRequest(res, "Something went wrong");
      }
    } else {
      return unauthorized(res);
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
