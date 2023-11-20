import path from 'node:path';
import fs from 'node:fs';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource.ts', () => {
  const logPath = path.join(__dirname, '../../../logs');
  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });
  test('should create log files if they do not exit', () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
  });
  test('should save a log in all logs-all.log', () => {
    const LogDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test-message',
      origin: 'file-system.datasource.test.ts',
    });
    LogDataSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
  });
  test('should save a log in all logs-medium.log', () => {
    const LogDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test-message',
      origin: 'file-system.datasource.test.ts',
    });
    LogDataSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });
  test('should save a log in all logs-high.log', () => {
    const LogDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test-message',
      origin: 'file-system.datasource.test.ts',
    });
    LogDataSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    const hihgLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(hihgLogs).toContain(JSON.stringify(log));
  });
  test('should return all logs', async () => {
    const LogDataSource = new FileSystemDataSource();
    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test-message',
      origin: 'file-system.datasource.test.ts',
    });
    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test-message',
      origin: 'file-system.datasource.test.ts',
    });
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test-message',
      origin: 'file-system.datasource.test.ts',
    });
    await LogDataSource.saveLog(logLow);
    await LogDataSource.saveLog(logMedium);
    await LogDataSource.saveLog(logHigh);

    const logsLow = await LogDataSource.getLogs(LogSeverityLevel.low);
    const logsMedium = await LogDataSource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await LogDataSource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });
  test('should not trow error if path exist', () => {
    new FileSystemDataSource();
    new FileSystemDataSource();
    expect(true).toBeTruthy();
  });
  test('should throw an error if severity level is not defined', async () => {
    const LogDataSource = new FileSystemDataSource();
    const customSeverityLevel = 'CUSTOM_SECURITY_LEVEL' as LogSeverityLevel;
    try {
      await LogDataSource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${error}`;
      expect(errorString).toContain(
        `Error: ${customSeverityLevel}Invalid severity level`
      );
    }
  });
});
