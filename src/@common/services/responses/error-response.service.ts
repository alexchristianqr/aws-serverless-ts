import { HttpStatusCodes } from "../../enums";

interface Body {
  status?: HttpStatusCodes;
  success?: boolean;
  message?: string;
  detail?: any;
  error?: Error;
}

interface Payload {
  body: Omit<Body, "error">;
}

interface Response {
  status: HttpStatusCodes;
  body: string;
}

export class ErrorResponseService {
  private payload: Payload = {
    body: { message: "Internal server error", success: false, detail: null, status: HttpStatusCodes.INTERNAL_SERVER }
  };
  private response: Response = { status: HttpStatusCodes.INTERNAL_SERVER, body: JSON.stringify(this.payload.body) };

  async apiResponse(payload: Body): Promise<Response> {
    this.payload.body.status = payload?.status || HttpStatusCodes.INTERNAL_SERVER;
    this.payload.body.success = payload?.success || false;
    this.payload.body.message = payload?.error?.message || payload?.message;
    this.payload.body.detail = payload?.error?.stack;

    this.response.status = this.payload.body.status;
    this.response.body = JSON.stringify(this.payload.body);

    return this.response;
  }
}
