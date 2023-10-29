interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on Check service ${url}`);
      this.successCallback();
      console.log(`Check service ${url} OK`);
      return true;
    } catch (error) {
      console.log(`${error} this doesn't work on Check service ${url}`);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
