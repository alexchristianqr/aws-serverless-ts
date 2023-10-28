import { CI_APIGatewayProxyEvent, CI_Context } from "../core"
import { SampleController } from "./application/controllers/sample.controller.ts"

export async function samples(event: CI_APIGatewayProxyEvent, context: CI_Context) {
  return new SampleController(event, context).selectResource()
}
