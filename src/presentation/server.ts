import { LogDataSource } from '../domain/datasources/log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasources';
import { PostgresLogDataSource } from '../infraestructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started');

    //Send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'killedmilo@gmail.com',
    // ]);
    // emailService.sendEmailWithFileSystemLogs(['killedmilo@gmail.com']);

    // const logs = await fileSystemLogRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);
    // CronService.createJob('*/5 * * * * *', () => {
    //   // const url = `http://localhost:3000/posts`;
    //   const url = `https://google.com`;
    //   new CheckServiceMultiple(
    //     [fileSystemLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   //new CheckService().execute('http://localhost:3000/posts');
    // });
  }
}
