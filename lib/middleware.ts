import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";
import { getAuthToken } from "./auth";
import { unauthorized } from "./response";

export function use(middleware: any) {
  return (req: NextApiRequestExtended, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const useAuth = use(
  async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
    const token = await getAuthToken(req);

    if (!token) {
      return unauthorized(res);
    }

    req.auth = token;
    console.log("ODne");
    next();
  }
);

export const useMustBeAdmin = use(
  async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
    await useAuth(req, res);
    console.log(req.auth);
    if (!req.auth?.is_admin) {
      return unauthorized(res);
    }
    next();
  }
);
