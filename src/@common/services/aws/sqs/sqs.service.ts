import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

export class SQSService {
  private sqsClient: SQSClient;

  constructor(private sqsQueueUrl: string) {
    this.sqsClient = new SQSClient({ region: "us-east-1" }); // Cambia la región si es necesario
  }

  // Enviar mensaje a la cola SQS
  async sendMessage(messageBody: string): Promise<void> {
    try {
      const params = {
        QueueUrl: this.sqsQueueUrl,
        MessageBody: messageBody
      };

      const command = new SendMessageCommand(params);
      await this.sqsClient.send(command);
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
        QueueUrl: this.sqsQueueUrl,
        MaxNumberOfMessages: 10 // Máximo 10 mensajes
      };

      const command = new ReceiveMessageCommand(params);
      const response = await this.sqsClient.send(command);

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
        QueueUrl: this.sqsQueueUrl,
        ReceiptHandle: receiptHandle
      };

      const command = new DeleteMessageCommand(params);
      await this.sqsClient.send(command);
      console.log("Mensaje eliminado de SQS");
    } catch (error) {
      console.error("Error eliminando mensaje de SQS:", error);
      throw error;
    }
  }
}
