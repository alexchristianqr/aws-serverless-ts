import { MemoryDBService } from "./memorydb.service.ts";

export async function MemorydbSanbox() {
  const memoryDBService = new MemoryDBService({ host: "my-memorydb-cluster.xxxxxx.memorydb.us-east-1.amazonaws.com" });

  // Establecer un valor
  await memoryDBService.set("key1", "value1");

  // Obtener un valor
  const value = await memoryDBService.get("key1");
  console.log("Valor:", value); // Output: Valor: value1

  // Eliminar un valor
  await memoryDBService.delete("key1");

  // Limpiar la base de datos
  await memoryDBService.flush();

  // Desconectar el cliente
  memoryDBService.disconnect();
}
