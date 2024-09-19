import { ErrorResponseService, SendResponseService } from "../services";

interface CustomResponse {
  send: SendResponseService;
  error: ErrorResponseService;
}

export abstract class BaseController {
  protected readonly response: CustomResponse = { send: new SendResponseService(), error: new ErrorResponseService() };
}
