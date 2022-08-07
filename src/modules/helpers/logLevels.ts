import { LogLevel } from '@nestjs/common';

export const createLogLevels = (level: number): LogLevel[] => {
  const levelsContainer: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  return levelsContainer.slice(0, level + 1);
};