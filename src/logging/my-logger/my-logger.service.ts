import { Injectable, ConsoleLogger } from '@nestjs/common';
import { createLogLevels } from 'src/modules/helpers/logLevels';
import { writeLogsToFile } from '../../modules/helpers/logsToFile';

@Injectable()
export class MyLoggerService extends ConsoleLogger {

  constructor() {
    super();
    this.setLogLevels([...createLogLevels(+process.env.LOG_LEVEL)]);
  }

  log(message: string) {
    writeLogsToFile(message, 'log', 'src/logs/allLogs');
    super.log(message);
  }

  error(message: string, trace?: string) {
    if (+process.env.LOG_LEVEL >= 1) {
      writeLogsToFile(message, 'log', 'src/logs/allLogs');
      writeLogsToFile(message, 'log', 'src/logs/errorLogs');
      super.error(message);
    }
  }

  warn(message: string) {
    if (+process.env.LOG_LEVEL >= 2) {
      writeLogsToFile(message, 'warn', 'src/logs/allLogs');
      super.warn(message);
    }
  }

  debug(message: string) {
    if (+process.env.LOG_LEVEL >= 3) {
      writeLogsToFile(message, 'debug', 'src/logs/allLogs');
      super.debug(message);
    }
  }

  verbose(message: string) {
    if (+process.env.LOG_LEVEL >= 4) {
      writeLogsToFile(message, 'debug', 'src/logs/allLogs');
      super.verbose(message);
    }
  }
}