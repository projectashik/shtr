import { hashPassword } from "lib/crypto";
import prisma from "lib/db";
import { makeSlug } from "lib/helper";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_auth(req, res);
  if (req.method === "POST") {
    const { links } = req.body;
    if (links) {
      console.log(links);
      let filteredLinks = links.filter((link: any) => link.url);
      if (filteredLinks.length < 1) return badRequest(res, "No links provided");
      filteredLinks = filteredLinks.filter((link: any) =>
        link.url.match(/^(http|https):\/\/[^ "]+$/)
      );
      if (filteredLinks.length < 1) {
        return badRequest(res, "No valid links provided");
      }
      const bulkLinks = filteredLinks.map((link: any) => {
        return {
          url: link.url,
          slug: makeSlug(),
          user_id: req.auth.user_id,
          password: link.password ? hashPassword(link.password) : "",
        };
      });

      console.log(bulkLinks);

      try {
        const links = await prisma?.link.createMany({
          data: bulkLinks,
        });
        return ok(res, links);
      } catch (e) {
        console.log(e);
        return badRequest(res, "Error creating links");
      }
    } else {
      res.status(400).json({
        error: "No links provided",
      });
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
