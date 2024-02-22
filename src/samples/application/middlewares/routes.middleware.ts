import { CI_APIGatewayProxyEvent, CI_APIGatewayProxyResult, middy } from "../../../@core";

export const routesMiddleware = (): middy.MiddlewareObj<CI_APIGatewayProxyEvent, CI_APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<CI_APIGatewayProxyEvent, CI_APIGatewayProxyResult> = async (request: any): Promise<any> => {
    // Your middleware logic
    console.log("Middleware.beforeController", { request });
  };

  const after: middy.MiddlewareFn<CI_APIGatewayProxyEvent, CI_APIGatewayProxyResult> = async (request: any): Promise<void> => {
    // Your middleware logic
    console.log("Middleware.afterController", { request });
  };

  return {
    before,
    after
  };
};
