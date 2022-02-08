import handler from "lib/handler";
import { badRequest, ok } from "lib/response";
import prisma from "lib/db";
import { useAuth } from "lib/middleware";

handler.get(async (req, res) => {
  await useAuth(req, res);
  try {
    const links = await prisma.link.findMany({
      include: {
        user: {
          select: {
            user_id: true,
          },
        },
      },
    });
    return ok(res, links);
  } catch (e: any) {
    badRequest(res, "Something went wrong");
  }
});

handler.post(async (req, res) => {
  await useAuth(req, res);
  const { user_id } = req.auth;
  const { url, slug } = req.body;
  try {
    const linkExisted = await prisma.link.findUnique({
      where: {
        slug: slug as string,
      },
    });
    if (!linkExisted) {
      const link = await prisma.link.create({
        data: {
          url,
          slug,
          user_id,
        },
      });
      return ok(res, link);
    } else {
      return badRequest(res, "Slug already exist");
    }
  } catch (e: any) {
    console.log(e);
    return badRequest(res, "Something went wrong");
  }
});

export default handler;
