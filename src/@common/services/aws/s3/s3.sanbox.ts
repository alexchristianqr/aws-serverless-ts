import { S3Service } from "./s3.service.ts";

export async function S3Sanbox() {
  const service = new S3Service({ bucketName: "mi-bucket" });

  // Subir un archivo
  const uploadResponse = await service.uploadFile("carpeta/archivo.txt", "Contenido del archivo", "text/plain");
  console.log("Archivo subido:", uploadResponse);

  // Descargar un archivo
  const downloadResponse = await service.downloadFile("carpeta/archivo.txt");
  console.log("Archivo descargado:", downloadResponse.Body?.toString());

  // Eliminar un archivo
  const deleteResponse = await service.deleteFile("carpeta/archivo.txt");
  console.log("Archivo eliminado:", deleteResponse);

  // Listar archivos
  const listResponse = await service.listFiles("carpeta/");
  console.log("Archivos en el bucket:", listResponse.Contents);
}
