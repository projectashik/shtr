import handler from "lib/handler";
import { badRequest, ok } from "lib/response";
import prisma from "lib/db";
import { useAuth } from "lib/middleware";
import link from "next/link";

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
        clicks: {
          select: {
            click_id: true,
            browser: true,
            country: true,
            device: true,
            ip: true,
            referral: true,
            os: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
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

handler.delete(async (req, res) => {
  await useAuth(req, res);
  const { slug } = req.body;
  try {
    const link = await prisma.link.findUnique({
      where: {
        slug: slug as string,
      },
    });
    const clicks = await prisma.click.deleteMany({
      where: {
        link_id: link?.link_id,
      },
    });
    await prisma.link.delete({
      where: {
        slug: slug as string,
      },
    });
    return ok(res, link);
  } catch (e: any) {
    console.log(e);
    return badRequest(res, "Something went wrong");
  }
});

export default handler;
