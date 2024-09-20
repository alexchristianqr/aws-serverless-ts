import { SQSService } from "./sqs.service.ts";

export async function SqsSandbox() {
  const service = new SQSService({ queueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue" });

  // Enviar un mensaje a SQS
  await service.sendMessage("Este es un mensaje de prueba");

  // Recibir mensajes de SQS
  const messages = await service.receiveMessages();
  console.log({ messages });
}
