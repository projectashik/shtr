import { click } from "@prisma/client";

export const makeSlug = () => {
  let length = 8;
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

// get topcountry for single link
export const getTopCountryForLink = (link: any) => {
  let countries: { [key: string]: number } = {};
  {
    link &&
      link.clicks &&
      link.clicks.map((click: click) => {
        click &&
          click.country &&
          (countries[click.country] = (countries[click.country] || 0) + 1);
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

// get top referral for single link
export const getTopReferralForLink = (link: any) => {
  let referrals: { [key: string]: number } = {};
  {
    link &&
      link.clicks &&
      link.clicks.map((click: click) => {
        if (click) {
          if (click.referral) {
            let newReferral = new URL(click.referral).hostname;
            referrals[newReferral] = (referrals[newReferral] || 0) + 1;
          }
        }
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

// get top browser for single link
export const getTopBrowserForLink = (link: any) => {
  let browsers: { [key: string]: number } = {};
  {
    link &&
      link.clicks &&
      link.clicks.map((click: click) => {
        if (click) {
          if (click.browser) {
            browsers[click.browser] = (browsers[click.browser] || 0) + 1;
          }
        }
      });
  }
  let topBrowser =
    browsers &&
    Object.keys(browsers).length > 0 &&
    Object.keys(browsers).reduce((a, b) => (browsers[a] > browsers[b] ? a : b));

  topBrowser = topBrowser || "";
  return topBrowser;
};
