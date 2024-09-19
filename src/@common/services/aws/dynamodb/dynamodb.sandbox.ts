import { DynamoDBService } from "./dynamodb.service.ts";

export async function DynamodbSandbox() {
  const service = new DynamoDBService("TuNombreDeTabla");

  // Agregar un ítem
  service.putItem({ id: "1", name: "John Doe", age: 30 }).then();

  // Obtener un ítem
  const item = await service.getItem({ id: "1" });
  console.log(item);

  // Actualizar un ítem
  await service.updateItem({ id: "1" }, { age: 31 });

  // Eliminar un ítem
  await service.deleteItem({ id: "1" });
}
