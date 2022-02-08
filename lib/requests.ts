import { NextApiRequest } from "next";
import { NextApiRequestExtended } from "types";
import requestIp from "request-ip";
import {
  DESKTOP_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH,
  LAPTOP_SCREEN_WIDTH,
  DESKTOP_OS,
  MOBILE_OS,
} from "./constants";
import isLocalhost from "is-localhost-ip";
import maxmind from "maxmind";
import path from "path";
import { browserName, detectOS } from "detect-browser";
import { parse } from "next-useragent";

let lookup: any;

export function getIpAddress(req: NextApiRequestExtended) {
  // Custom header
  if (req.headers[process.env.CLIENT_IP_HEADER as string]) {
    return req.headers[process.env.CLIENT_IP_HEADER as string];
  }
  // Cloudflare
  else if (req.headers["cf-connecting-ip"]) {
    return req.headers["cf-connecting-ip"];
  }

  return requestIp.getClientIp(req);
}

export function getDevice(req: NextApiRequest, os: string) {
  const userAgent = parse(req.headers["user-agent"] as string);

  if (DESKTOP_OS.includes(os)) {
    return "desktop";
  } else if (MOBILE_OS.includes(os)) {
    return "mobile";
  }

  if (userAgent.isDesktop) {
    return "desktop";
  } else if (userAgent.isTablet) {
    return "tablet";
  } else if (userAgent.isMobile) {
    return "mobile";
  } else {
    return "laptop";
  }
}

export async function getCountry(req: NextApiRequestExtended, ip: string) {
  // Cloudflare
  if (req.headers["cf-ipcountry"]) {
    return req.headers["cf-ipcountry"];
  }

  // Ignore local ips
  if (await isLocalhost(ip)) {
    return;
  }

  // Database lookup
  if (!lookup) {
    lookup = await maxmind.open(
      path.resolve(__dirname, "./public/geo/GeoLite2-Country.mmdb")
    );
  }

  const result = lookup.get(ip);

  return result?.country?.iso_code;
}

export async function getClientInfo(req: any) {
  const userAgent = req.headers["user-agent"];
  const ip = getIpAddress(req);
  const country = await getCountry(req, ip as string);
  const browser = browserName(userAgent as string);
  const os = detectOS(userAgent as string);
  const device = getDevice(req, os as string);

  return { userAgent, browser, os, ip, country, device };
}
