import { LogModel, MongoDatabase } from '../../data/mongo';
import { envs } from '../../config/plugins/envs.plugins';
import { MongoLogDataSource } from './mongo-log.datasources';
import mongoose from 'mongoose';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('mongo-log.datasource.ts', () => {
  const logDataSource = new MongoLogDataSource();
  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test-message',
    origin: 'test',
  });
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });
  afterEach(async () => {
    await LogModel.deleteMany();
  });
  afterAll(async () => {
    mongoose.connection.close();
  });
  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');
    await logDataSource.saveLog(log);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(expect.any(String));
    // expect(log).toBeInstanceOf(LogEntity);
  });
  test('should get logs', async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});
