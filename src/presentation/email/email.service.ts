import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}
interface Attachment {
  filename: string;
  path: string;
}

//todo: implement email service
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_EMAIL,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = `logs from server`;
    const htmlBody = `
    <h3> Logs from system</h3>
    <p>lorem</p>
    <p>logs attachment</p> 
    `;
    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
