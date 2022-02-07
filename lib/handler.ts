import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { NextApiRequestExtended } from "types";
import { badRequest, methodNotAllowed } from "./response";

const handler = nc<NextApiRequestExtended, NextApiResponse>({
  onError: (err, req, res, next) => {
    badRequest(res);
  },
  onNoMatch: (req, res, next) => {
    methodNotAllowed(res);
  },
});

export default handler;
