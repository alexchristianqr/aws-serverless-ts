import { SNSService } from "./sns.service.ts";

export async function SnsSandbox() {
  // Inicializa el servicio SNS con la región deseada
  const snsService = new SNSService({}); // Cambia la región si es necesario

  // Publicar un mensaje
  try {
    const topicArn = "arn:aws:sns:us-west-2:123456789012:MyTopic";
    const message = "Este es un mensaje de prueba";

    const result = await snsService.publishMessage(topicArn, message);
    console.log("Message published:", result);
  } catch (error) {
    console.error("Error publishing message:", error);
  }

  // Suscribirse a un tópico
  try {
    const topicArn = "arn:aws:sns:us-west-2:123456789012:MyTopic";
    const protocol = "email"; // Puede ser 'email', 'sms', 'sqs', 'lambda', etc.
    const endpoint = "example@example.com"; // El endpoint depende del protocolo

    const result = await snsService.subscribe(topicArn, protocol, endpoint);
    console.log("Subscription created:", result);
  } catch (error) {
    console.error("Error creating subscription:", error);
  }

  // Listar todos los tópicos
  try {
    const topics = await snsService.listTopics();
    console.log("Topics:", topics.Topics);
  } catch (error) {
    console.error("Error listing topics:", error);
  }

  // Listar todas las suscripciones
  try {
    const subscriptions = await snsService.listSubscriptions();
    console.log("Subscriptions:", subscriptions.Subscriptions);
  } catch (error) {
    console.error("Error listing subscriptions:", error);
  }

  // Eliminar una suscripción
  try {
    const subscriptionArn = "arn:aws:sns:us-west-2:123456789012:MyTopic:1234abcd-5678-efgh-9101-ijklmnop";
    await snsService.unsubscribe(subscriptionArn);
    console.log("Subscription deleted successfully.");
  } catch (error) {
    console.error("Error deleting subscription:", error);
  }
}
