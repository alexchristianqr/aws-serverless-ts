import { CI_APIGatewayProxyEvent as Event, CI_APIGatewayProxyResult as Result, CI_Context as Context, middy } from "../@common";
import { RouterController } from "./application/controllers/router.controller.ts";

async function lambdaHandler(event: Event, context: Context): Promise<Result> {
  const router = new RouterController();
  return router.selectResource(event, context);
}

export const samples = middy<Event, Result>().use([]).handler(lambdaHandler);
