import * as dotenv from "dotenv";
import { createLogger, format, transports } from 'winston';
dotenv.config();

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: `/api/v2/logs?dd-api-key=${process.env.DD_APIKEY}&ddtags=${process.env.DD_TAGS}&ddsource=nodejs&service=${process.env.DD_SERVICE}&hostname=${process.env.DD_HOSTNAME}`,
  ssl: true
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions),
  ],
});

export default logger;