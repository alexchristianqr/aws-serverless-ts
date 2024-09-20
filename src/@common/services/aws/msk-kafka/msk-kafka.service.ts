import { Kafka } from "kafkajs";

interface ConfigDefault {
  clientId?: string;
  topic?: string;
  brokers?: string[];
}
const configDefault: ConfigDefault = {
  clientId: "my-app",
  topic: "",
  brokers: []
};

export class MskKafkaService {
  private readonly client: Kafka;
  private readonly topic: string;
  private producer: any;
  private consumer: any;

  constructor({ brokers, topic, clientId }: ConfigDefault) {
    this.client = new Kafka({
      clientId: clientId ?? configDefault.clientId,
      brokers: brokers ?? configDefault.brokers
    });
    this.topic = topic ?? configDefault.topic;
  }

  async initProducer() {
    this.producer = this.client.producer();
    await this.producer.connect();
  }

  async produceMessage(message: string) {
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: message }]
    });
    console.log(`Message sent to topic ${this.topic}: ${message}`);
  }

  async initConsumer() {
    this.consumer = this.client.consumer({ groupId: "my-group" });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic });

    await this.consumer.run({
      eachMessage: async ({ message /*topic, partition*/ }: any) => {
        console.log(`Received message: ${message.value.toString()}`);
      }
    });
  }

  async disconnect() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}
