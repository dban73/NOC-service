import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';

describe('email.service.ts', () => {
  const mockSendMail = jest.fn();
  const emailService = new EmailService();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'fernando@gmail.com',
      subject: 'test',
      htmlBody: '<h1>test</h1>',
    };
    const sent = await emailService.sendEmail(options);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>test</h1>',
      subject: 'test',
      to: 'fernando@gmail.com',
    });
  });
  test('should send email with attachment', async () => {
    const email = 'fernando@gmail.com';
    await emailService.sendEmailWithFileSystemLogs(email);
    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'logs from server',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ]),
    });
  });
});
