import handler from "lib/handler";
import prisma from "lib/db";
import { badRequest, notFound, ok } from "lib/response";
import { linkClickQuery } from "lib/queries";

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
  if (link.password !== password) {
    console.log("link.password", link.password);
    console.log("password", password);
    return badRequest(res, "Password is incorrect");
  }
  await linkClickQuery(req, link.link_id);
  return ok(res, { success: true });
});

export default handler;
