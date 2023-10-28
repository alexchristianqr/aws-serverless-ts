import { CI_APIGatewayProxyEvent, CI_Context } from "../interfaces"

interface BodyPayload<T> {
  payload: T | any
}

export class ProxyEventMiddleware<T> {
  protected body: BodyPayload<T> | any
  protected params: T | any
  protected event: CI_APIGatewayProxyEvent
  protected context?: CI_Context

  constructor(event: CI_APIGatewayProxyEvent, context?: CI_Context) {
    console.log("[ProxyEventMiddleware.constructor]")

    this.event = event
    this.context = context
    const { body, pathParameters } = event

    if (body) this.body = JSON.parse(body)
    if (pathParameters) this.params = pathParameters

    console.log({ body: this.body, params: this.params, event: this.event, context: this.context })
  }
}
