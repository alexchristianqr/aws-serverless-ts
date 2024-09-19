import { SQSService } from "./sqs.service.ts";

export async function SqsSanbox() {
  const sqsService = new SQSService("https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue");

  // Enviar un mensaje a SQS
  await sqsService.sendMessage("Este es un mensaje de prueba");

  // Recibir mensajes de SQS
  const messages = await sqsService.receiveMessages();
  console.log({ messages });
}
