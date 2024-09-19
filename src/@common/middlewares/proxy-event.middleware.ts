import { CI_APIGatewayProxyEvent } from "../interfaces";

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

type TypeStructureRequest = "query" | "body" | "params" | "query|body|params" | "body|params" | "query|body" | "query|params";

export async function proxyEventMiddleware<T>(event: CI_APIGatewayProxyEvent, type: TypeStructureRequest) {
  let bodyPayload: BodyPayload<T> | any;
  let paramsPayload: T | any;

  const { body, pathParameters, queryStringParameters } = event;

  if (body) bodyPayload = JSON.parse(body);
  if (pathParameters) paramsPayload = pathParameters;

  switch (type) {
    case "query":
      return { ...queryStringParameters, event };
    case "body":
      return { ...bodyPayload, event };
    case "params":
      return { ...paramsPayload, event };
    case "query|body|params":
      return { ...queryStringParameters, ...bodyPayload, ...paramsPayload, event };
    case "body|params":
      return { ...bodyPayload, ...paramsPayload, event };
    case "query|body":
      return { ...queryStringParameters, ...bodyPayload, event };
    case "query|params":
      return { ...queryStringParameters, ...paramsPayload, event };
    default:
      throw new Error(`Tipo debe ser: query / body / params / query|body|params / body|params`);
  }
}
