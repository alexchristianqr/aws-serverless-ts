import { UserController } from "./application/controllers/user.controller.ts";
import { CI_APIGatewayProxyEvent, CI_Context } from "../core";

export async function users(event: CI_APIGatewayProxyEvent, context: CI_Context) {
  return new UserController(event, context).selectResource();
}
