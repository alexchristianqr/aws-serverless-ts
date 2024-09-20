import AWS from "aws-sdk";

interface ConfigDefault {
  region?: string;
}
const configDefault: ConfigDefault = {
  region: "us-east-1"
};

export class LambdaFunctionService {
  private readonly client: AWS.Lambda;

  constructor({ region }: ConfigDefault) {
    this.client = new AWS.Lambda({ region: region ?? configDefault.region });
  }

  // Invoca una función Lambda con los parámetros especificados
  async invokeFunction(functionName: string, payload: object): Promise<AWS.Lambda.InvocationResponse> {
    const params: AWS.Lambda.InvocationRequest = {
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    };

    try {
      const response = await this.client.invoke(params).promise();
      return response;
    } catch (error) {
      throw new Error(`Error invoking Lambda function: ${error}`);
    }
  }

  // Lista todas las funciones Lambda en la cuenta
  async listFunctions(): Promise<AWS.Lambda.FunctionList> {
    try {
      const response = await this.client.listFunctions().promise();
      return response.Functions || [];
    } catch (error) {
      throw new Error(`Error listing Lambda functions: ${error}`);
    }
  }

  // Obtiene detalles de una función Lambda específica
  async getFunction(functionName: string): Promise<AWS.Lambda.FunctionConfiguration> {
    const params: AWS.Lambda.GetFunctionRequest = {
      FunctionName: functionName
    };

    try {
      const response = await this.client.getFunction(params).promise();
      return response.Configuration!;
    } catch (error) {
      throw new Error(`Error getting Lambda function details: ${error}`);
    }
  }

  // Crea una nueva función Lambda
  async createFunction(params: AWS.Lambda.CreateFunctionRequest): Promise<AWS.Lambda.FunctionConfiguration> {
    try {
      const response = await this.client.createFunction(params).promise();
      return response;
    } catch (error) {
      throw new Error(`Error creating Lambda function: ${error}`);
    }
  }

  // Elimina una función Lambda
  async deleteFunction(functionName: string): Promise<void> {
    const params: AWS.Lambda.DeleteFunctionRequest = {
      FunctionName: functionName
    };

    try {
      await this.client.deleteFunction(params).promise();
    } catch (error) {
      throw new Error(`Error deleting Lambda function: ${error}`);
    }
  }
}
