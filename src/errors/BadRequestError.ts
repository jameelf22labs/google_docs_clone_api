export default class BadRequestError extends Error {
  public readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    Error.captureStackTrace(this);
  }
}
