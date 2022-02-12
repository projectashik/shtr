import { click } from "@prisma/client";
import { useTheme } from "next-themes";

export const makeSlug = (length: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const countTotalClicks = (links: any[] | undefined) => {
  let totalClicks = 0;
  {
    links &&
      links.length > 0 &&
      links.map((link) => (totalClicks += link.clicks.length));
  }
  return totalClicks;
};

export const getTopCountry = (links: any[] | undefined) => {
  let countries: { [key: string]: number } = {};
  {
    links &&
      links.length > 0 &&
      links.map((link) => {
        link.clicks.map((click: click) => {
          click &&
            click.country &&
            (countries[click.country] = (countries[click.country] || 0) + 1);
        });
      });
  }
  let topCountry =
    countries &&
    Object.keys(countries).length > 0 &&
    Object.keys(countries).reduce((a, b) =>
      countries[a] > countries[b] ? a : b
    );
  return topCountry || "";
};

export const getTopReferral = (links: any[] | undefined) => {
  let referrals: { [key: string]: number } = {};
  {
    links &&
      links.length > 0 &&
      links.map((link) => {
        link.clicks.map((click: click) => {
          if (click) {
            if (click.referral) {
              let newReferral = new URL(click.referral).hostname;
              referrals[newReferral] = (referrals[newReferral] || 0) + 1;
            }
          }
        });
      });
  }
  let topReferral =
    referrals &&
    Object.keys(referrals).length > 0 &&
    Object.keys(referrals).reduce((a, b) =>
      referrals[a] > referrals[b] ? a : b
    );

  topReferral = topReferral || "";
  return topReferral;
};
