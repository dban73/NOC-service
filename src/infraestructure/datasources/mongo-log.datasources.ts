import { LogModel } from '../../data/mongo';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class MongoLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log(`Mongo Log created: ${newLog.id}`);
  }
  async getLogs(levelSecurity: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: levelSecurity });
    return logs.map(LogEntity.fromObject);
  }
}
