import { log } from "./logging";
import config from "./config";
import { app } from "./app";

app.listen(config.port, () => {
  log("info", `[${config.env}] App is listening on port ${config.port}`);
});
