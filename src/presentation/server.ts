import { LogDataSource } from '../domain/datasources/log.datasource';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started');

    //Send email
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      'killedmilo@gmail.com',
    ]);
    // emailService.sendEmailWithFileSystemLogs(['killedmilo@gmail.com']);
    // CronService.createJob('*/5 * * * * *', () => {
    //   // const url = `http://localhost:3000/posts`;
    //   const url = `https://google.com`;
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000/posts");
    // });
  }
}
