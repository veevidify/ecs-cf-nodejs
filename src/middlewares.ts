import { Handler } from "express";
import { log } from "./logging";

const logReq: Handler = (req, res, next) => {
  const { url, method, headers } = req;
  log("info", "Recv request", {
    url,
    method,
    headers,
  });
  next();
};

const logRes: Handler = (req, res, next) => {
  res.on("finish", () => {
    const { statusCode, statusMessage, headersSent } = res;
    log("info", "Send response", { statusCode });
  });
  next();
};

export { logReq, logRes };
