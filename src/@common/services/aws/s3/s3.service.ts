import AWS from "aws-sdk";

interface ConfigDefault {
  bucketName?: string;
  region?: string;
}
const configDefault: ConfigDefault = {
  bucketName: "my-bucket",
  region: "us-east-1"
};

export class S3Service {
  private readonly s3: AWS.S3;
  private readonly bucketName: string;

  constructor({ bucketName, region }: ConfigDefault) {
    this.s3 = new AWS.S3({ region: region ?? configDefault.region });
    this.bucketName = bucketName ?? configDefault.bucketName;
  }

  // Subir un archivo a S3
  async uploadFile(key: string, body: Buffer | string, contentType: string): Promise<AWS.S3.PutObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType
    };
    return this.s3.upload(params).promise();
  }

  // Descargar un archivo de S3
  async downloadFile(key: string): Promise<AWS.S3.GetObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: key
    };
    return this.s3.getObject(params).promise();
  }

  // Eliminar un archivo de S3
  async deleteFile(key: string): Promise<AWS.S3.DeleteObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: key
    };
    return this.s3.deleteObject(params).promise();
  }

  // Listar archivos en el bucket
  async listFiles(prefix?: string): Promise<AWS.S3.ListObjectsV2Output> {
    const params = {
      Bucket: this.bucketName,
      Prefix: prefix
    };
    return this.s3.listObjectsV2(params).promise();
  }
}
