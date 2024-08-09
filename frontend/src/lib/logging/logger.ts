import { EventEmitter } from "events";

import { LogLevel, type LogEvent, type LoggerEventMap } from "./types";

/**
 * Abstract class representing a logger.
 */
export abstract class Logger extends EventEmitter<LoggerEventMap> {
  /**
   * Abstract method to write a log event.
   *
   * @param event - The log event containing the log level and message.
   */
  protected abstract write(event: LogEvent): void;

  /**
   * Logs a message at the debug level.
   *
   * @param message - The message to log. Can be of any type.
   * @example
   * logger.debug("This is a debug message.");
   */
  public debug(message: any): void {
    this.log(LogLevel.Debug, message);
  }

  /**
   * Logs a message at the info level.
   *
   * @param message - The message to log.
   */
  public info(message: any): void {
    this.log(LogLevel.Information, message);
  }

  /**
   * Logs a message at the warn level.
   *
   * @param message - The message to log.
   */
  public warn(message: any): void {
    this.log(LogLevel.Warning, message);
  }

  /**
   * Logs a message at the error level.
   *
   * @param message - The message to log.
   */
  public error(message: any): void {
    this.log(LogLevel.Error, message);
  }

  /**
   * Logs a message at a specified log level.
   * This method creates a log event and emits it.
   *
   * @param level - The log level for the message (e.g., debug, info, warn, error).
   * @param message - The message to log. Can be of any type.
   */
  public log(level: LogLevel, message: any) {
    const event: LogEvent = { level, message };
    this.write(event);
    this.emit("log", event);
  }
}

export default Logger;
