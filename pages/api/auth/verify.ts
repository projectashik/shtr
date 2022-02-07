import handler from "lib/handler";
import { useAuth } from "lib/middleware";
import { ok, unauthorized } from "lib/response";

handler.get(async (req, res) => {
  await useAuth(req, res);
  console.log("Done");
  console.log(req.auth);
  if (req.auth) {
    return ok(res, { auth: req.auth });
  }
  return unauthorized(res);
});

export default handler;
