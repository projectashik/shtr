import { use_auth } from "lib/middleware";
import { ok, unauthorized } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

export default async function handler(
  req: NextApiRequestExtended,
  res: NextApiResponse
) {
  await use_auth(req, res);
  if (req.auth) {
    return ok(res, { auth: req.auth });
  }
  return unauthorized(res);
}
