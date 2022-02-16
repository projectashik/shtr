import { link } from "@prisma/client";
import axios from "axios";
import Layout from "components/layouts/Layout";
import FullLogo from "components/logos/full";
import { Button } from "components/ui";
import Input from "components/ui/Input";
import Label from "components/ui/Label";
import prisma from "lib/db";
import { linkClickQuery } from "lib/queries";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState } from "react";
import { HiArrowRight } from "react-icons/hi";

export default function SlugPage({ link }: { link: any }) {
  const parsedLink: link = JSON.parse(link);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/link/secured", {
        link_id: parsedLink.link_id,
        password,
        ref: document.referrer,
      });
      if (res.data) {
        setLoading(false);
        router.push(parsedLink.url);
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data as string);
    }
  };

  return (
    <Layout>
      <div>{!parsedLink && <h1>404 Not Found</h1>}</div>
      {parsedLink && parsedLink.password && (
        <div>
          <h2 className="mt-10 text-center text-4xl font-bold">
            This link is password protected
          </h2>
          <form
            onSubmit={handleSubmit}
            className="shadow-3xl dark:bg-dark102 my-10 mx-auto max-w-md rounded border bg-white p-8 shadow-gray-900 dark:border-gray-600"
          >
            <Label htmlFor="password">Enter password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            {/* Tailwind primary button */}
            <Button rightIcon={<HiArrowRight />} className="mt-2">
              Proceed
            </Button>
          </form>
          <a href="https://shtr.tk" className="flex justify-center">
            <FullLogo />
          </a>
        </div>
      )}
    </Layout>
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
    if (link.password) {
      return {
        props: {
          link: JSON.stringify(link),
        },
      };
    } else {
      await linkClickQuery(req, link.link_id);
      return {
        props: {
          link: JSON.stringify(link),
        },
        redirect: {
          permanent: false,
          destination: link.url,
        },
      };
    }
  } else {
    return {
      props: {
        link: null,
      },
    };
  }
}
