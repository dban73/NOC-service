import { envs } from './envs.plugins';
describe('envs.plugin.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'nestor.benitez.diaz@gmail.com',
      MAILER_SECRET_KEY: 'kvhjacqnucmatsdc',
      PROD: false,
      MONGO_URL:
        'mongodb://alejandro:123456@localhost:27017/?authMechanism=DEFAULT',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'alejandro',
      MONGO_PASS: '123456789',
    });
  });
  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./envs.plugins');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
