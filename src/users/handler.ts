import { UserController } from "./application/controllers/user.controller.ts";
import { CI_APIGatewayProxyEvent, CI_APIGatewayProxyHandler, CI_Context } from "../core";

export async function users(event: CI_APIGatewayProxyEvent, context: CI_Context): Promise<CI_APIGatewayProxyHandler> {
  const controller = new UserController(event, context);
  return controller.selectResource();
}
