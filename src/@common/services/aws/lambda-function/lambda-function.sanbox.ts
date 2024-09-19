import { LambdaFunctionService } from "./lambda-function.service.ts";

export async function LambdaFunctionSanbox() {
  // Creación de instancia con la región 'us-east-1'
  const lambdaService = new LambdaFunctionService("us-east-1");

  // Simulación: Invocar una función Lambda con datos simulados
  const simulatedPayload = { userId: "12345", action: "create", resource: "document" };
  try {
    const response = await lambdaService.invokeFunction("MyTestLambdaFunction", simulatedPayload);
    console.log("Respuesta de la invocación Lambda:", response);
  } catch (error) {
    console.error("Error invocando la función Lambda:", error);
  }

  // Simulación: Listar funciones Lambda en 'us-east-1'
  try {
    const functions = await lambdaService.listFunctions();
    console.log("Funciones Lambda disponibles en us-east-1:", functions);
  } catch (error) {
    console.error("Error listando funciones Lambda:", error);
  }

  // Cambiar a una región diferente: 'eu-west-1'
  const lambdaServiceEU = new LambdaFunctionService("eu-west-1");

  // Simulación: Listar funciones Lambda en 'eu-west-1'
  try {
    const functionsEU = await lambdaServiceEU.listFunctions();
    console.log("Funciones Lambda disponibles en eu-west-1:", functionsEU);
  } catch (error) {
    console.error("Error listando funciones Lambda en eu-west-1:", error);
  }

  // Simulación: Obtener detalles de una función Lambda en 'eu-west-1'
  try {
    const functionDetails = await lambdaServiceEU.getFunction("MyLambdaEU");
    console.log("Detalles de la función Lambda en EU:", functionDetails);
  } catch (error) {
    console.error("Error obteniendo detalles de la función Lambda:", error);
  }

  // Simulación: Eliminar una función Lambda
  try {
    await lambdaServiceEU.deleteFunction("MyLambdaEU");
    console.log("Función Lambda eliminada exitosamente en EU");
  } catch (error) {
    console.error("Error eliminando la función Lambda:", error);
  }
}
