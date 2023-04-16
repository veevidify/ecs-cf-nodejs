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

// fallback 404
apis.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

export { apis };
