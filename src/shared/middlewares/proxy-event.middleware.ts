import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"

interface BodyPayload<T> {
  payload: T | any
}

export class ProxyEventMiddleware<T> {
  protected body: BodyPayload<T> | any
  protected params: T | any
  protected event: APIGatewayProxyEvent

  constructor(event: APIGatewayProxyEvent) {
    this.event = event
    const { body, pathParameters } = event

    if (body) this.body = JSON.parse(body)
    if (pathParameters) this.params = pathParameters

    console.log({ body: this.body, params: this.params, event: this.event })
  }
}
