import { CI_APIGatewayProxyEvent, CI_Context } from "../interfaces";

interface Route {
  path: string;
  callback: Function;
}

export interface IRoutes {
  [key: string]: Route[];
}

interface BodyPayload<T> {
  payload: T | any;
}

type TypeStructureRequest = "query" | "body" | "params" | "query|body|params" | "body|params";

export async function proxyEventMiddleware<T>(event: CI_APIGatewayProxyEvent, type: TypeStructureRequest) {
  let bodyPayload: BodyPayload<T> | any;
  let paramsPayload: T | any;

  const { body, pathParameters, queryStringParameters } = event;

  if (body) bodyPayload = JSON.parse(body);
  if (pathParameters) paramsPayload = pathParameters;

  switch (type) {
    case "body":
      return bodyPayload;
    case "params":
      return paramsPayload;
    case "query|body|params":
      return { ...queryStringParameters, ...bodyPayload, ...paramsPayload };
    case "body|params":
      return { ...bodyPayload, ...paramsPayload };
    case "query":
      return queryStringParameters;
    default:
      throw new Error(`Tipo debe ser: query / body / params / query|body|params / body|params`);
  }
}

export class ProxyEventMiddleware<T> {
  protected body: BodyPayload<T> | any;
  protected params: T | any;
  protected query: T | any;
  protected event: CI_APIGatewayProxyEvent;
  protected context?: CI_Context;

  constructor(event: CI_APIGatewayProxyEvent, context?: CI_Context) {
    console.log("[ProxyEventMiddleware.constructor]");

    this.event = event;
    this.context = context;
    const { body, pathParameters, queryStringParameters } = event;

    if (body) this.body = JSON.parse(body);
    if (pathParameters) this.params = pathParameters;
    if (queryStringParameters) this.query = queryStringParameters;
  }

  resourceIsValid(path: string) {
    return this.event.resource === path;
  }
}
