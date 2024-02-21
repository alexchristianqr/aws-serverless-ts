import { CI_APIGatewayProxyEvent, CI_APIGatewayProxyResult, CI_Context, middy } from "../core";
import { SampleController } from "./application/controllers/sample.controller.ts";
import { routesMiddleware } from "./application/middlewares/routes.middleware.ts";

async function lambdaHandler(event: CI_APIGatewayProxyEvent, context: CI_Context): Promise<CI_APIGatewayProxyResult> {
  const controller = new SampleController(event, context);
  return controller.selectResource();
}
export const samples = middy<CI_APIGatewayProxyEvent, CI_APIGatewayProxyResult>().use([routesMiddleware()]).handler(lambdaHandler);
