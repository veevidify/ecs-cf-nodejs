import { createLogger, format, transports } from "winston";
import type { Logger } from "winston";

const { combine, timestamp, prettyPrint } = format;

type LogLevel = "info" | "debug" | "error";

export const winstonLogger: Logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

export const logWith =
  (logger: Logger | Console) =>
  (level: LogLevel, contents: any) => {
    logger.log({
      level,
      message: contents,
    });
  };

export const log = logWith(winstonLogger);
