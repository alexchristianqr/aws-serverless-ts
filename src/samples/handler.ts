import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { SampleController } from "./infrastructure/controllers/sample.controller.ts"

export async function samples(event: APIGatewayProxyEvent) {
  return new SampleController(event).selectResource()
}
