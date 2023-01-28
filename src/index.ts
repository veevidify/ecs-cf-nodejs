import createExpressApp, { Express } from "express";
import dotenv from "dotenv";

import { log } from "./logging";

const app = createExpressApp();
dotenv.config();

const port = process.env.PORT || 3000;
const env = process.env.APP_ENV || "local";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  log("info", `[${env}] App is listening on port ${port}`);
});
