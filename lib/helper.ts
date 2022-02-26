import { click } from "@prisma/client";
import { linkWithClicks } from "types";

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

// get a list of all countries along with the number of clicks from those country for the given link
export const getCountriesWithClicks = (
  link: linkWithClicks,
  startAt?: string,
  endsAt?: string
) => {
  let countries: {
    country: string;
    clicks: number;
    createdAt: Date;
  }[] = [];
  const clicks = link.clicks;
  clicks &&
    clicks.map((click: click) => {
      if (click)
        if (click.country)
          if (!countries.find((country) => country.country === click.country)) {
            countries.push({
              country: click.country as string,
              clicks: 1,
              createdAt: click.created_at as Date,
            });
          } else {
            const country = countries.find(
              (country) => country?.country === click.country
            );
            if (country) {
              country.clicks += 1;
            }
          }
    });
  return countries;
};

// get a list of all countries along with the number of clicks from those country for the given link of certain date range
export const getCountriesWithClicksByDateRange = (
  link: linkWithClicks,
  startAt?: Date,
  endsAt?: Date
) => {
  let countries: {
    country: string;
    clicks: number;
    createdAt: Date;
  }[] = [];
  const clicks = link.clicks;
  clicks &&
    clicks
      .filter((click: click) => {
        if (click) {
          if (click.created_at) {
            if (startAt && endsAt) {
              return (
                new Date(click.created_at) >= new Date(startAt) &&
                new Date(click.created_at) <= new Date(endsAt)
              );
            } else if (startAt) {
              return new Date(click.created_at) >= new Date(startAt);
            } else if (endsAt) {
              return new Date(click.created_at) <= new Date(endsAt);
            }
          }
        }
      })
      .map((click: click) => {
        if (click.country)
          if (!countries.find((country) => country.country === click.country)) {
            countries.push({
              country: click.country as string,
              clicks: 1,
              createdAt: click.created_at as Date,
            });
          } else {
            const country = countries.find(
              (country) => country?.country === click.country
            );
            if (country) {
              country.clicks += 1;
            }
          }
      });
  return countries;
};

export const getDevicesWithClicksByDateRange = (
  link: linkWithClicks,
  startAt?: Date,
  endsAt?: Date
) => {
  let devices: {
    device: string;
    clicks: number;
  }[] = [];
  const clicks = link.clicks;
  clicks &&
    clicks
      .filter((click: click) => {
        if (click) {
          if (click.created_at) {
            if (startAt && endsAt) {
              return (
                new Date(click.created_at) >= new Date(startAt) &&
                new Date(click.created_at) <= new Date(endsAt)
              );
            } else if (startAt) {
              return new Date(click.created_at) >= new Date(startAt);
            } else if (endsAt) {
              return new Date(click.created_at) <= new Date(endsAt);
            }
          }
        }
      })
      .map((click: click) => {
        if (click.device)
          if (!devices.find((device) => device.device === click.device)) {
            devices.push({
              device: click.device as string,
              clicks: 1,
            });
          } else {
            const device = devices.find(
              (device) => device?.device === click.device
            );
            if (device) {
              device.clicks += 1;
            }
          }
      });
  return devices;
};

export const getBrowsersWithClicksByDateRange = (
  link: linkWithClicks,
  startAt?: Date,
  endsAt?: Date
) => {
  let browsers: {
    browser: string;
    clicks: number;
  }[] = [];
  const clicks = link.clicks;
  clicks &&
    clicks
      .filter((click: click) => {
        if (click) {
          if (click.created_at) {
            if (startAt && endsAt) {
              return (
                new Date(click.created_at) >= new Date(startAt) &&
                new Date(click.created_at) <= new Date(endsAt)
              );
            } else if (startAt) {
              return new Date(click.created_at) >= new Date(startAt);
            } else if (endsAt) {
              return new Date(click.created_at) <= new Date(endsAt);
            }
          }
        }
      })
      .map((click: click) => {
        if (click.device)
          if (!browsers.find((browser) => browser.browser === click.browser)) {
            browsers.push({
              browser: click.browser as string,
              clicks: 1,
            });
          } else {
            const browser = browsers.find(
              (browser) => browser?.browser === click.browser
            );
            if (browser) {
              browser.clicks += 1;
            }
          }
      });
  return browsers;
};

// get a list of all referral with the number of clicks from the referral for the given link
export const getReferralWithClicksByDateRange = (
  link: linkWithClicks,
  startAt?: Date,
  endsAt?: Date
) => {
  let referrals: {
    referral: string;
    clicks: number;
  }[] = [];
  const clicks = link.clicks;
  clicks &&
    clicks
      .filter((click: click) => {
        if (click) {
          if (click.created_at) {
            if (startAt && endsAt) {
              return (
                new Date(click.created_at) >= new Date(startAt) &&
                new Date(click.created_at) <= new Date(endsAt)
              );
            } else if (startAt) {
              return new Date(click.created_at) >= new Date(startAt);
            } else if (endsAt) {
              return new Date(click.created_at) <= new Date(endsAt);
            }
          }
        }
      })
      .map((click: click) => {
        if (click)
          if (click.referral)
            if (
              !referrals.find(
                (referral) => referral.referral === click.referral
              )
            ) {
              referrals.push({
                referral: click.referral as string,
                clicks: 1,
              });
            } else {
              const referral = referrals.find(
                (referral) => referral?.referral === click.referral
              );
              if (referral) {
                referral.clicks += 1;
              }
            }
      });
  return referrals;
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
