import { GetServerSidePropsContext } from "next";
import prisma from "lib/db";
import { link } from "@prisma/client";
import Head from "next/head";
import { getClientInfo } from "lib/requests";

export default function SlugPage({ link }: { link: any }) {
  const parsedLink = JSON.parse(link);
  return (
    <>
      <div>{!parsedLink && <h1>404 Not Found</h1>}</div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  const req = context.req;

  const link = await prisma?.link.findUnique({
    where: {
      slug: slug as string,
    },
  });
  if (link) {
    console.log("COntext");
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
        link_id: link.link_id,
        ua: ua,
        browser: browser as string,
        os: os as string,
        country: country as string,
        device,
        ip: ip as string,
        referral: req.headers["referer"],
      },
    });
    return {
      props: {
        link: JSON.stringify(link),
      },
      redirect: {
        permanent: false,
        destination: link.url,
      },
    };
  } else {
    return {
      props: {
        link: null,
      },
    };
  }
}
