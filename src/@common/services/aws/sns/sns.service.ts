import { SNS } from "aws-sdk";

export class SNSService {
  private sns: SNS;

  constructor(region: string) {
    this.sns = new SNS({ region });
  }

  // Publicar un mensaje en un topic
  async publishMessage(topicArn: string, message: string, attributes?: SNS.MessageAttributeMap): Promise<SNS.PublishResponse> {
    const params: SNS.PublishInput = {
      TopicArn: topicArn,
      Message: message,
      MessageAttributes: attributes || {}
    };

    try {
      const result = await this.sns.publish(params).promise();
      console.log(`Message sent to topic: ${topicArn}`);
      return result;
    } catch (error) {
      console.error(`Failed to publish message: ${error}`);
      throw error;
    }
  }

  // Crear una suscripción
  async subscribe(topicArn: string, protocol: string, endpoint: string): Promise<SNS.SubscribeResponse> {
    const params: SNS.SubscribeInput = {
      TopicArn: topicArn,
      Protocol: protocol,
      Endpoint: endpoint
    };

    try {
      const result = await this.sns.subscribe(params).promise();
      console.log(`Subscription created: ${result.SubscriptionArn}`);
      return result;
    } catch (error) {
      console.error(`Failed to create subscription: ${error}`);
      throw error;
    }
  }

  // Eliminar una suscripción
  async unsubscribe(subscriptionArn: string): Promise<void> {
    const params: SNS.UnsubscribeInput = {
      SubscriptionArn: subscriptionArn
    };

    try {
      await this.sns.unsubscribe(params).promise();
      console.log(`Subscription deleted: ${subscriptionArn}`);
    } catch (error) {
      console.error(`Failed to delete subscription: ${error}`);
      throw error;
    }
  }

  // Listar todos los tópicos
  async listTopics(): Promise<SNS.ListTopicsResponse> {
    try {
      const result = await this.sns.listTopics().promise();
      console.log("Topics:", result.Topics);
      return result;
    } catch (error) {
      console.error(`Failed to list topics: ${error}`);
      throw error;
    }
  }

  // Listar todas las suscripciones
  async listSubscriptions(): Promise<SNS.ListSubscriptionsResponse> {
    try {
      const result = await this.sns.listSubscriptions().promise();
      console.log("Subscriptions:", result.Subscriptions);
      return result;
    } catch (error) {
      console.error(`Failed to list subscriptions: ${error}`);
      throw error;
    }
  }
}
