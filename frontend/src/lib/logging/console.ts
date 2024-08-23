import colors from "picocolors";

import Logger from "./logger";
import { LogLevel, type LogEvent } from "./types";

export class ConsoleLogger extends Logger {
  protected static _instance: ConsoleLogger = new this();

  protected static dispatchers: Record<LogLevel, (message: any) => void> = {
    dbug: console.debug,
    info: console.info,
    warn: console.warn,
    crit: console.error,
  };

  protected static styles: Record<LogLevel, (message: any) => string> = {
    dbug: colors.gray,
    info: colors.green,
    warn: colors.yellow,
    crit: colors.red,
  };

  protected constructor() {
    super();
  }

  protected override write(event: LogEvent): void {
    const message = this.format(event);
    ConsoleLogger.dispatchers[event.level](message);
  }

  protected format(event: LogEvent): any {
    const timestamp = colors.dim(new Date().toLocaleTimeString());
    const severity = colors.bold(ConsoleLogger.styles[event.level](`[${event.level}]`));
    return `${timestamp} ${severity} ${event.args.join(" ")}`;
  }

  public static get instance(): ConsoleLogger {
    return this._instance;
  }
}

export const logger = ConsoleLogger.instance;

export default logger;
