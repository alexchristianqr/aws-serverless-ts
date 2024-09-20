import { DynamoDB } from "aws-sdk";

interface ConfigDefault {
  region?: string;
  tableName?: string;
}
const configDefault: ConfigDefault = {
  region: "us-east-1",
  tableName: "TuNombreDeTabla"
};

export class DynamoDBService {
  private readonly client: DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor({ region, tableName }: ConfigDefault) {
    this.client = new DynamoDB.DocumentClient({ region: region ?? configDefault.region });
    this.tableName = tableName ?? configDefault.tableName;
  }

  // Insertar un nuevo item en la tabla
  async putItem(item: Record<string, any>): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: item
    };

    try {
      await this.client.put(params).promise();
      console.log("Item inserted successfully");
    } catch (error) {
      console.error("Error inserting item:", error);
      throw error;
    }
  }

  // Obtener un item por su clave primaria
  async getItem(key: Record<string, any>): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: key
    };

    try {
      const result = await this.client.get(params).promise();
      return result.Item;
    } catch (error) {
      console.error("Error getting item:", error);
      throw error;
    }
  }

  // Actualizar un item
  async updateItem(key: Record<string, any>, updates: Record<string, any>): Promise<void> {
    const updateExpression = Object.keys(updates)
      .map((_, index) => `#key${index} = :value${index}`)
      .join(", ");
    const expressionAttributeNames = Object.keys(updates).reduce((acc, key, index) => {
      acc[`#key${index}`] = key;
      return acc;
    }, {} as Record<string, string>);
    const expressionAttributeValues = Object.keys(updates).reduce((acc, key, index) => {
      acc[`:value${index}`] = updates[key];
      return acc;
    }, {} as Record<string, any>);

    const params = {
      TableName: this.tableName,
      Key: key,
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
    };

    try {
      await this.client.update(params).promise();
      console.log("Item updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  // Eliminar un item
  async deleteItem(key: Record<string, any>): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: key
    };

    try {
      await this.client.delete(params).promise();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}
