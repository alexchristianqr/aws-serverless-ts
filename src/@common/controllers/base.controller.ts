import { ErrorResponseService, SendResponseService } from "../services";

export abstract class BaseController {
  protected readonly response: any = { send: new SendResponseService(), error: new ErrorResponseService() };
}
