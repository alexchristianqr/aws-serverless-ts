import { CC_InvokeCommand, CC_LambdaClient, CI_InvokeCommandInput } from "../../interfaces"
import { ErrorResponseService } from "../responses/error-response.service.ts"

export class LambdafunctionAdapterService {
  static async invokeFunction(input: CI_InvokeCommandInput) {
    try {
      const command = new CC_InvokeCommand(input)
      return new CC_LambdaClient({}).send(command, {})
    } catch (error: any) {
      return new ErrorResponseService().apiResponse({ error })
    }
  }
}
