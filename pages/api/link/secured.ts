import { checkPassword } from "lib/crypto";
import prisma from "lib/db";
import handler from "lib/handler";
import { linkClickQuery } from "lib/queries";
import { badRequest, notFound, ok } from "lib/response";

handler.post(async (req, res) => {
  const { link_id, password } = req.body;
  const link = await prisma.link.findUnique({
    where: {
      link_id: +link_id,
    },
  });
  if (!link) {
    return notFound(res, "Link not found");
  }
  if (!checkPassword(password, link.password as string)) {
    return badRequest(res, "Password is incorrect");
  }
  try {
    await linkClickQuery(req, link.link_id);
  } catch (e) {
    console.log(e);
  }
  return ok(res, { success: true });
});

export default handler;
