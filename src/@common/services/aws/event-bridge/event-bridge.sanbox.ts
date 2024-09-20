import { EventBridgeService } from "./event-bridge.service.ts";

export async function EventBridgeSanbox() {
  const eventBridgeService = new EventBridgeService({ eventBusName: "MyEventBus" });

  // Enviar un evento a EventBridge
  await eventBridgeService.sendEvent("UserCreated", { userId: "12345", username: "john_doe" });
}
