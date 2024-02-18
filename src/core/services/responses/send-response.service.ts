import { HttpStatusCodes } from "../../enums";

interface Body {
  statusCode?: HttpStatusCodes;
  success?: boolean;
  result?: any;
  message: string | null;
}

interface Payload {
  body: Body;
}

interface Response {
  statusCode: HttpStatusCodes;
  body: string;
}

export class SendResponseService {
  private payload: Payload = {
    body: { message: null, success: true, result: null, statusCode: HttpStatusCodes.OK }
  };
  private response: Response = { statusCode: HttpStatusCodes.OK, body: JSON.stringify(this.payload.body) };

  async apiResponse(payload: Body): Promise<Response> {
    this.payload.body.statusCode = payload?.statusCode || HttpStatusCodes.OK;
    this.payload.body.success = payload?.success || true;
    this.payload.body.result = payload?.result || undefined;
    this.payload.body.message = payload.message;

    this.response.statusCode = this.payload.body.statusCode;
    this.response.body = JSON.stringify(this.payload.body);

    return this.response;
  }
}
