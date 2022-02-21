import prisma from "lib/db";
import { getClientInfo } from "./requests";

export const linkClickQuery = async (req: any, link_id: number) => {
  const {
    browser,
    country,
    device,
    ip,
    os,
    userAgent: ua,
  } = await getClientInfo(req);
  await prisma.click.create({
    data: {
      link_id: link_id,
      ua: ua,
      browser: browser as string,
      os: os as string,
      country: country as string,
      device,
      ip: ip as string,
      referral: req.headers["referer"],
    },
  });
};
