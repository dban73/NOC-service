import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';
describe('send-email-logs.ts', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };
  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  test('should call send the email and save log', async () => {
    const result = await sendEmailLogs.execute('milo@gmail.com');
    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
  test('should log in case of error', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
    const result = await sendEmailLogs.execute('milo@gmail.com');
    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
