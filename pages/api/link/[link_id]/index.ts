import prisma from "lib/db";
import handler from "lib/handler";
import { use_auth } from "lib/middleware";
import { badRequest, ok, unauthorized } from "lib/response";

handler.post(async (req, res) => {
  await use_auth(req, res);
  const { user_id, isAdmin } = req.auth;
  const { link_id } = req.query;
  const { url, slug } = req.body;
  try {
    const link = await prisma.link.findUnique({
      where: {
        link_id: +link_id,
      },
    });
    if (link && (link.user_id === user_id || isAdmin)) {
      try {
        const link = await prisma.link.update({
          where: {
            link_id: +link_id,
          },
          data: {
            url,
            slug,
          },
        });
        return ok(res, link);
      } catch (e: any) {
        console.log(e.code);
        return badRequest(res, "Something went wrong");
      }
      return ok(res, link);
    }
    return unauthorized(res, "Unauthorized");
  } catch (e) {
    console.log(e);
    return badRequest(res, "Something went wrong");
  }
});

export default handler;
