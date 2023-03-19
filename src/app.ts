import createExpressApp from "express";
import { apis } from "./route-controllers";

const app = createExpressApp();
app.use("/api", apis);

export { app };
