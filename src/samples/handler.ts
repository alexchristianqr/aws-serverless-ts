import { CI_APIGatewayProxyEvent, CI_APIGatewayProxyHandler, CI_Context } from "../core";
import { SampleController } from "./application/controllers/sample.controller.ts";

export async function samples(event: CI_APIGatewayProxyEvent, context: CI_Context): Promise<CI_APIGatewayProxyHandler> {
  const controller = new SampleController(event, context);
  return controller.selectResource();
}
