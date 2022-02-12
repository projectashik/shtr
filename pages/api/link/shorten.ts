import { use_auth } from "lib/middleware";
import { badRequest, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";
import prisma from "lib/db";

export default async function handler(
  req: NextApiRequestExtended,
  res: NextApiResponse
) {
  await use_auth(req, res);
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
    return badRequest(res, "Something went wrong");
  }
}
