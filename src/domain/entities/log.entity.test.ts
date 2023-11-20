import { LogEntity, LogSeverityLevel } from './log.entity';
describe('LogEntity', () => {
  const dataobj = {
    message: 'Hello World',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts',
  };
  test('should create a Log Entity instace', () => {
    const log = new LogEntity(dataobj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataobj.message);
    expect(log.level).toBe(dataobj.level);
    expect(log.origin).toBe(dataobj.origin);
    expect(log.createAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instance from json ', () => {
    const json = `{"message":"Service https://google.com is up","level":"low","createAt":"2023-11-16T20:13:45.566Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service https://google.com is up');
    expect(log.level).toBe('low');
    expect(log.origin).toBe('check-service.ts');
    expect(log.createAt).toBeInstanceOf(Date);
  });
  test('should create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(dataobj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataobj.message);
    expect(log.level).toBe(dataobj.level);
    expect(log.origin).toBe(dataobj.origin);
    expect(log.createAt).toBeInstanceOf(Date);
  });
});
