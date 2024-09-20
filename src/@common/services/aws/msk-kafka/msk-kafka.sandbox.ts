import { MskKafkaService } from "./msk-kafka.service.ts";

export async function MskKafkaSandbox() {
  const brokers = ["b-1.mykafka-cluster.amazonaws.com:9092"]; // Cambia por tus brokers
  const topic = "my-topic";

  const kafkaClient = new MskKafkaService({ brokers, topic });

  await kafkaClient.initProducer();
  await kafkaClient.produceMessage("Hello, Kafka!");

  await kafkaClient.initConsumer();

  // No olvides desconectar cuando termines
  // await kafkaClient.disconnect();
}
