import cors from "cors";
import { NextApiResponse } from "next";
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

export const use_auth = use(
  async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
    const token = await getAuthToken(req);

    if (!token) {
      return unauthorized(res);
    }

    req.auth = token;
    next();
  }
);

export const use_Cors = use(cors());
