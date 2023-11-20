import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { PostgresLogDataSource } from './postgres-log.datasource';
describe('postgres-log.datasource', () => {
  const logDataSource = new PostgresLogDataSource();
  const prismaClient = new PrismaClient();
  const log = new LogEntity({
    level: LogSeverityLevel.high,
    message: 'test-message',
    origin: 'postgres-log-datasource.test.ts',
  });
  const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
  };
  const level = severityEnum[log.level];
  afterEach(async () => {
    await prismaClient.logModel.deleteMany();
  });
  afterAll(async () => {
    await prismaClient.$disconnect();
  });
  test('should save a log', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level,
      },
    });
    expect(newLog).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        message: 'test-message',
        origin: 'postgres-log-datasource.test.ts',
        level: 'HIGH',
        createAt: expect.any(Date),
      })
    );
  });
});
