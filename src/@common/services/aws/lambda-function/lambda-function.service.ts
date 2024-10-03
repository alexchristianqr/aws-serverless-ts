import {
  LambdaClient,
  InvokeCommand,
  ListFunctionsCommand,
  GetFunctionCommand,
  CreateFunctionCommand,
  DeleteFunctionCommand,
  InvokeCommandInput,
  CreateFunctionCommandInput,
  GetFunctionCommandInput,
  DeleteFunctionCommandInput,
  ListFunctionsCommandOutput,
  FunctionConfiguration,
  InvokeCommandOutput
} from "@aws-sdk/client-lambda";

interface ConfigDefault {
  region?: string;
}
const configDefault: ConfigDefault = {
  region: "us-east-1"
};

export class LambdaFunctionService {
  private readonly client: LambdaClient;

  constructor({ region }: ConfigDefault) {
    this.client = new LambdaClient({ region: region ?? configDefault.region });
  }

  // Invoca una función Lambda con los parámetros especificados
  async invokeFunction(functionName: string, payload: object): Promise<InvokeCommandOutput> {
    const params: InvokeCommandInput = {
      FunctionName: functionName,
      Payload: Buffer.from(JSON.stringify(payload)) // Buffer requerido en AWS SDK v3
    };

    try {
      const command = new InvokeCommand(params);
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      throw new Error(`Error invoking Lambda function: ${error}`);
    }
  }

  // Lista todas las funciones Lambda en la cuenta
  async listFunctions(): Promise<ListFunctionsCommandOutput["Functions"]> {
    try {
      const command = new ListFunctionsCommand();
      const response = await this.client.send(command);
      return response.Functions || [];
    } catch (error) {
      throw new Error(`Error listing Lambda functions: ${error}`);
    }
  }

  // Obtiene detalles de una función Lambda específica
  async getFunction(functionName: string): Promise<FunctionConfiguration> {
    const params: GetFunctionCommandInput = { FunctionName: functionName };

    try {
      const command = new GetFunctionCommand(params);
      const response = await this.client.send(command);
      return response.Configuration!;
    } catch (error) {
      throw new Error(`Error getting Lambda function details: ${error}`);
    }
  }

  // Crea una nueva función Lambda
  /**
   * @param FunctionName @requires (String) - El nombre de la función Lambda (e.g., "myLambdaFunction").
   * @param Role @requires (String) - ARN del rol de IAM que la función Lambda usará (e.g., "arn:aws:iam::123456789012:role/my-lambda-role").
   * @param Handler @requires (String) - El manejador de la función Lambda (formato: "archivo.método", e.g., "index.handler").
   * @param Runtime @requires (String) - El runtime a usar para la función (e.g., "nodejs14.x", "nodejs16.x", "python3.8", etc.).
   * @param Code @requires (String) - Información sobre el código de la función, donde:
   *   - S3Bucket - Nombre del bucket de S3 donde está almacenado el código (e.g., "my-bucket").
   *   - S3Key - Clave del objeto en S3 que contiene el código (e.g., "my-lambda-code.zip").
   * @param MemorySize @default - (Opcional) Cantidad de memoria asignada a la función (en MB, valor por defecto es 128).
   * @param Timeout @default - (Opcional) Tiempo máximo de ejecución de la función (en segundos, valor por defecto es 3).
   * @param Description @default - (Opcional) Descripción de la función Lambda (e.g., "Esta función procesa eventos...").
   * @param Environment @default - (Opcional) Variables de entorno para la función, especificadas como un objeto clave-valor.
   * @param Tags @default - (Opcional) Un objeto que contiene etiquetas (key-value pairs) para la función Lambda.
   * @param Publish @default - (Opcional) Indica si se debe publicar automáticamente la versión de la función (valor por defecto es true).
   * @param VpcConfig @default - (Opcional) Configuración de VPC, especificando subredes y grupos de seguridad.
   *   - SubnetIds - Lista de IDs de subredes (e.g., ["subnet-12345678"]).
   *   - SecurityGroupIds - Lista de IDs de grupos de seguridad (e.g., ["sg-12345678"]).
   * @param DeadLetterConfig @default - (Opcional) Configuración de la cola de entrega en caso de fallo.
   *   - TargetArn - ARN de la cola de SQS o el tópico SNS.
   * @param TracingConfig @default - (Opcional) Configuración de trazabilidad (para AWS X-Ray).
   *   - Mode - Modo de trazabilidad (e.g., "Active" o "PassThrough").
   */
  async createFunction(params: CreateFunctionCommandInput): Promise<FunctionConfiguration> {
    try {
      const command = new CreateFunctionCommand({ ...params });
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      throw new Error(`Error creating Lambda function: ${error}`);
    }
  }

  // Elimina una función Lambda
  async deleteFunction(functionName: string): Promise<void> {
    const params: DeleteFunctionCommandInput = { FunctionName: functionName };

    try {
      const command = new DeleteFunctionCommand(params);
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Error deleting Lambda function: ${error}`);
    }
  }
}
