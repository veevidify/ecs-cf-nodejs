import { Router } from "express";
import { logRes, logReq } from "./middlewares";

const apis = Router();
apis.use(logReq);
apis.use(logRes);

apis.get("/", (req, res) => {
  res.send("Hello World");
});

apis.get("/ping", (req, res) => {
  res.send("pong");
});

export { apis };
