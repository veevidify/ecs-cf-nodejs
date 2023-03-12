import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;
const env = process.env.APP_ENV || "dev";

const config = { port, env };

export default config;
