import * as colors from 'colors';

enum LogLevel {
  INFO = 'info',
  SUCCESS = 'success',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
}

class Logger {
  private static logLevel: LogLevel = LogLevel.INFO;

  public static setLogLevel(level: LogLevel): void {
    Logger.logLevel = level;
  }

  private static shouldLog(level: LogLevel): boolean {
    return level >= Logger.logLevel;
  }

  private static getTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  public static info(message: string | any): void {
    if (Logger.shouldLog(LogLevel.INFO)) {
      console.log(colors.cyan(`[${Logger.getTimestamp()}] [INFO]`), message);
    }
  }

  public static success(message: string | any): void {
    if (Logger.shouldLog(LogLevel.SUCCESS)) {
      console.log(colors.green(`[${Logger.getTimestamp()}] [SUCCESS]`), message);
    }
  }

  public static debug(message: string | any): void {
    if (Logger.shouldLog(LogLevel.DEBUG)) {
      console.log(colors.gray(`[${Logger.getTimestamp()}] [DEBUG]`), message);
    }
  }

  public static warn(message: string | any): void {
    if (Logger.shouldLog(LogLevel.WARN)) {
      console.warn(colors.yellow(`[${Logger.getTimestamp()}] [WARN]`), message);
    }
  }

  public static error(message: string | any): void {
    if (Logger.shouldLog(LogLevel.ERROR)) {
      console.error(colors.red(`[${Logger.getTimestamp()}] [ERROR]`), message);
    }
  }
}

export default Logger;