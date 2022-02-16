import { checkPassword } from "lib/crypto";
import prisma from "lib/db";
import { linkClickQuery } from "lib/queries";
import { badRequest, methodNotAllowed, notFound, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { link_id, password, ref } = req.body;
    console.log(req.body);
    req.headers.referer = ref;
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
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
