import { use_auth } from "lib/middleware";
import { ok, unauthorized } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_auth(req, res);
  if (req.auth) {
    return ok(res, { auth: req.auth });
  }
  return unauthorized(res);
};

export default handler;
