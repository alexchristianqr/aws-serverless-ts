import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

export class EventBridgeService {
  private eventBridgeClient: EventBridgeClient;

  constructor(private eventBusName: string) {
    this.eventBridgeClient = new EventBridgeClient({ region: "us-east-1" }); // Cambia la región si es necesario
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
      await this.eventBridgeClient.send(command);
      console.log("Evento enviado a EventBridge");
    } catch (error) {
      console.error("Error enviando evento a EventBridge:", error);
      throw error;
    }
  }
}
