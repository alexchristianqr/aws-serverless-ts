import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"

interface IGlobalAWS extends APIGatewayProxyEvent {}

export interface GlobalAwsInterface extends IGlobalAWS {}
