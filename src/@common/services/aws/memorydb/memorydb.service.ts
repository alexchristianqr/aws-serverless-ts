import { Redis } from "ioredis";

interface ConfigDefault {
  port?: number; // Puerto predeterminado de Redis
  host?: string; // Cambia esto por el endpoint de tu clúster de MemoryDB
  tls?: object; // TLS es necesario para MemoryDB en AWS
}
const configDefault: ConfigDefault = {
  port: 6379,
  host: "my-memorydb-cluster.xxxxxx.memorydb.us-east-1.amazonaws.com",
  tls: {}
};

export class MemoryDBService {
  private readonly client: Redis;

  constructor({ host, port, tls }: ConfigDefault) {
    this.client = new Redis({
      host: host ?? configDefault.host,
      port: port ?? configDefault.port,
      tls: tls ?? configDefault.tls
    });
  }

  public async set(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value);
    } catch (error) {
      console.error("Error al establecer el valor:", error);
      throw error;
    }
  }

  public async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      console.error("Error al obtener el valor:", error);
      throw error;
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error("Error al eliminar el valor:", error);
      throw error;
    }
  }

  public async flush(): Promise<void> {
    try {
      await this.client.flushdb();
    } catch (error) {
      console.error("Error al limpiar la base de datos:", error);
      throw error;
    }
  }

  public disconnect(): void {
    this.client.disconnect();
  }
}
