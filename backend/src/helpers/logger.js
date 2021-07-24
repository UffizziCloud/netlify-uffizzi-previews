/* const { createLogger, transports, format } = require("winston");
const fs = require("fs");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");

let dir = process.env.LOG_DIR;
if (!dir) dir = path.resolve("logs");

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const logLevel = process.env.NODE_ENV === "development" ? "debug" : "warn";

const options = {
  file: {
    level: logLevel,
    filename: dir + "/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: "20m",
    colorize: true,
    maxFiles: "14d",
  },
};

module.exports = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint()
      ),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
 */

const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

let dir = process.env.LOG_DIR;
if (!dir) dir = path.resolve("logs");

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const logLevel = process.env.NODE_ENV === "development" ? "debug" : "warn";
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transport = new DailyRotateFile({
  filename: dir + "/%DATE%.log",
  datePattern: `YYYY-MM-DD`,
  timestamp: true,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  prepend: true,
  level: logLevel,
  prettyPrint: true,
  json: true,
});
transport.on(`rotate`, function (oldFilename, newFilename) {
  // call function like upload to s3 or on cloud
});
const logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      level: "info",
    }),
  ],

  exitOnError: false, // do not exit on handled exceptions
});
module.exports = logger;
