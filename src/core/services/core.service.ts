import { SendResponseService, ErrorResponseService } from "./responses"
import { ProxyEventMiddleware } from "../middlewares"

export abstract class CoreService<T> extends ProxyEventMiddleware<T> {
  protected readonly response: any = { send: new SendResponseService(), error: new ErrorResponseService() }
}
