import { CI_APIGatewayProxyEvent as Event, CI_APIGatewayProxyResult as Result, CI_Context as Context } from "../@common";
import { RouterController } from "./application/controllers/router.controller.ts";
import { middy } from "../@common/libs/middy.lib.ts";

async function lambdaHandler(event: Event, context: Context): Promise<Result> {
  const router = new RouterController();
  return router.selectResource(event, context);
}

export const users = middy<Event, Result>().use([]).handler(lambdaHandler);
