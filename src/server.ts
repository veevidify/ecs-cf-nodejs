import createExpressApp from "express";
import { apis } from "./route-controllers";
import { log } from "./logging";
import config from "./config";

const app = createExpressApp();
app.use("/api", apis);
app.listen(config.port, () => {
  log("info", `[${config.env}] App is listening on port ${config.port}`);
});