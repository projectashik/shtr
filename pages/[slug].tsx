import { GetServerSidePropsContext } from "next";
import prisma from "lib/db";
import { link } from "@prisma/client";
import Head from "next/head";

export default function SlugPage({ link }: { link: any }) {
  const parsedLink = JSON.parse(link);
  return (
    <>
      {parsedLink && (
        <Head>
          <title>{parsedLink.title ?? ""}</title>
          <meta name="description" content={parsedLink.description ?? ""} />
          <meta property="og:title" content={parsedLink.title ?? ""} />
          <meta
            property="og:description"
            content={parsedLink.description ?? ""}
          />
          <meta property="og:image" content={parsedLink.image ?? ""} />
          {/* <meta property="og:url" content={parsedLink.url ?? ""} /> */}
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={parsedLink.title ?? ""} />
        </Head>
      )}
      <div>{parsedLink && <h1>{parsedLink.title}</h1>}</div>
      <div>{!parsedLink && <h1>404 Not Found</h1>}</div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;

  const link = await prisma?.link.findUnique({
    where: {
      slug: slug as string,
    },
  });
  if (link) {
    return {
      props: {
        link: JSON.stringify(link),
      },
      redirect: {
        permanent: true,
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
