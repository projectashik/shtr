import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    await use_auth(req, res);
    const { slug } = req.body;
    try {
      const link = await prisma.link.findUnique({
        where: {
          slug: slug as string,
        },
      });
      await prisma.link.delete({
        where: {
          slug: slug as string,
        },
      });
      return ok(res, link);
    } catch (e: any) {
      return badRequest(res, "Something went wrong");
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
