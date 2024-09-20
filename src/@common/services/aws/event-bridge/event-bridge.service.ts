import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

interface ConfigDefault {
  region?: string;
  eventBusName?: string;
}
const configDefault: ConfigDefault = {
  region: "us-east-1",
  eventBusName: "MyEventBus"
};

export class EventBridgeService {
  private readonly client: EventBridgeClient;
  private readonly eventBusName: string;

  constructor({ eventBusName, region }: ConfigDefault) {
    this.client = new EventBridgeClient({ region: region ?? configDefault.region }); // Cambia la región si es necesario
    this.eventBusName = eventBusName ?? configDefault.eventBusName;
  }

  // Enviar evento a EventBridge
  async sendEvent(detailType: string, detail: object): Promise<void> {
    try {
      const params = {
        Entries: [
          {
            Source: "custom.source", // Cambia el origen según tu caso
            EventBusName: this.eventBusName,
            DetailType: detailType,
            Detail: JSON.stringify(detail)
          }
        ]
      };

      const command = new PutEventsCommand(params);
      await this.client.send(command);
      console.log("Evento enviado a EventBridge");
    } catch (error) {
      console.error("Error enviando evento a EventBridge:", error);
      throw error;
    }
  }
}
