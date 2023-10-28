import { APIGatewayProxyEvent, APIGatewayProxyEventV2WithRequestContext, Context, APIGatewayProxyCallback, Handler } from "aws-lambda"
import { LambdaClient, InvokeCommandInput, InvokeAsyncCommandInput, InvokeCommand, LogType, InvokeCommandOutput } from "@aws-sdk/client-lambda"

/* Custom Interfaces (CI_) */
export declare interface CI_APIGatewayProxyEvent extends APIGatewayProxyEvent {}
export declare interface CI_APIGatewayProxyEventV2WithRequestContext extends APIGatewayProxyEventV2WithRequestContext<Context> {}
export declare interface CI_Context extends Context {}
export declare interface CI_APIGatewayProxyCallback extends APIGatewayProxyCallback {}
export declare interface CI_Handler extends Handler {}
export declare interface CI_InvokeCommandInput extends InvokeCommandInput {}
export declare interface CI_InvokeAsyncCommandInput extends InvokeAsyncCommandInput {}
export declare interface CI_InvokeCommandOutput extends InvokeCommandOutput {}

/* Custom Clases (CC_) */
export class CC_LambdaClient extends LambdaClient {}
export class CC_InvokeCommand extends InvokeCommand {}

/* Custom Variables (CV_) */
export const CV_LogType = LogType
