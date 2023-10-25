import { SendResponseService } from "./responses/send-response.service.ts"
import { ErrorResponseService } from "./responses/error-response.service.ts"
import { ProxyEventMiddleware } from "../middlewares"

export abstract class CoreService<T> extends ProxyEventMiddleware<T> {
  protected readonly response: any = { send: new SendResponseService(), error: new ErrorResponseService() }
}
