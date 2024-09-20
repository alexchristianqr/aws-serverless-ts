import { EventBridgeService } from "./event-bridge.service.ts";

export async function EventBridgeSandbox() {
  const eventBridgeService = new EventBridgeService({ eventBusName: "MyEventBus" });

  // Enviar un evento a EventBridge
  await eventBridgeService.sendEvent("UserCreated", { userId: "12345", username: "john_doe" });
}
