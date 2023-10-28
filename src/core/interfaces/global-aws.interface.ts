import { APIGatewayProxyEvent, Context, APIGatewayProxyCallback, Handler } from "aws-lambda"
import { LambdaClient, InvokeCommandInput, InvokeAsyncCommandInput, InvokeCommand, LogType, InvokeCommandOutput } from "@aws-sdk/client-lambda"

/* Interfaces */
export declare interface CI_APIGatewayProxyEvent extends APIGatewayProxyEvent {}
export declare interface CI_Context extends Context {}
export declare interface CI_APIGatewayProxyCallback extends APIGatewayProxyCallback {}
export declare interface CI_Handler extends Handler {}
export declare interface CI_InvokeCommandInput extends InvokeCommandInput {}
export declare interface CI_InvokeAsyncCommandInput extends InvokeAsyncCommandInput {}
export declare interface CI_InvokeCommandOutput extends InvokeCommandOutput {}

/* Clases */
export class CC_LambdaClient extends LambdaClient {}
export class CC_InvokeCommand extends InvokeCommand {}

/* Constantes */
export const CV_LogType = LogType
