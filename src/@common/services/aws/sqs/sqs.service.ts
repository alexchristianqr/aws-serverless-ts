import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

interface ConfigDefault {
  queueUrl?: string;
  region?: string;
}
const configDefault: ConfigDefault = {
  queueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue",
  region: "us-east-1"
};

export class SQSService {
  private readonly client: SQSClient;
  private readonly queueUrl: string;

  constructor({ queueUrl, region }: ConfigDefault) {
    this.client = new SQSClient({ region: region ?? configDefault.region });
    this.queueUrl = queueUrl ?? configDefault.queueUrl;
  }

  // Enviar mensaje a la cola SQS
  async sendMessage(messageBody: string): Promise<void> {
    try {
      const params = {
        QueueUrl: this.queueUrl,
        MessageBody: messageBody
      };

      const command = new SendMessageCommand(params);
      await this.client.send(command);
      console.log("Mensaje enviado a SQS");
    } catch (error) {
      console.error("Error enviando mensaje a SQS:", error);
      throw error;
    }
  }

  // Recibir mensajes de la cola SQS
  async receiveMessages(): Promise<any[]> {
    try {
      const params = {
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 10 // Máximo 10 mensajes
      };

      const command = new ReceiveMessageCommand(params);
      const response = await this.client.send(command);

      if (response.Messages) {
        console.log(`${response.Messages.length} mensajes recibidos de SQS`);
        return response.Messages;
      } else {
        console.log("No hay mensajes en la cola SQS");
        return [];
      }
    } catch (error) {
      console.error("Error recibiendo mensajes de SQS:", error);
      throw error;
    }
  }

  // Eliminar mensaje de la cola SQS
  async deleteMessage(receiptHandle: string): Promise<void> {
    try {
      const params = {
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle
      };

      const command = new DeleteMessageCommand(params);
      await this.client.send(command);
      console.log("Mensaje eliminado de SQS");
    } catch (error) {
      console.error("Error eliminando mensaje de SQS:", error);
      throw error;
    }
  }
}
