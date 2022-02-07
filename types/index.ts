import { NextApiRequest } from "next";

export interface NextApiRequestExtended extends NextApiRequest {
  auth:
    | any
    | {
        user_id: number;
        username: string;
        is_admin: boolean;
        iat: number;
      }
    | null;
}
