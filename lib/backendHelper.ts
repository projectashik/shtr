import prisma from "lib/db";
import { makeSlug } from "./helper";
export const parseSlug = (slug: string) => {
  if (slug.length < 1) return makeSlug();
  const link = prisma.link
    .findUnique({
      where: {
        slug: slug,
      },
    })
    .then((res) => res);
  if (!link) return slug;
  return makeSlug();
};
