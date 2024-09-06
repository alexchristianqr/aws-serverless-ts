export class Exception extends Error {
  public code?: string;
  public httpCode?: number;
  public messages: string[];
  public log: Record<string, unknown>;

  constructor({
                code,
                httpCode,
                messages = ["Error"],
                log = {}
              }: {
    code?: string;
    httpCode?: number;
    messages?: string | string[];
    log?: Record<string, unknown>;
  }) {
    super(Array.isArray(messages) ? messages.join(", ") : messages);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.code = code;
    this.httpCode = httpCode;
    this.messages = Array.isArray(messages) ? messages : [messages];
    this.log = log;
  }
}