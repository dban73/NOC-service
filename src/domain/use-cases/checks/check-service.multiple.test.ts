import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service multiple';

describe('check-service.multiple.ts', () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    [mockRepository1, mockRepository2, mockRepository3],
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should successCallback return true', async () => {
    const wasOk = await checkServiceMultiple.execute('https://google.com');
    expect(wasOk).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
  test('should call errorCallbak when fetch return false', async () => {
    const wasOk = await checkServiceMultiple.execute('httpsxds://google.com');
    expect(wasOk).toBeFalsy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
