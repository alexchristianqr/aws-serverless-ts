import { DynamoDB } from "aws-sdk";

export class DynamoDBService {
  private dynamoDb: DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor(tableName: string) {
    this.dynamoDb = new DynamoDB.DocumentClient();
    this.tableName = tableName;
  }

  // Insertar un nuevo item en la tabla
  async putItem(item: Record<string, any>): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: item
    };

    try {
      await this.dynamoDb.put(params).promise();
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
      const result = await this.dynamoDb.get(params).promise();
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
      await this.dynamoDb.update(params).promise();
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
      await this.dynamoDb.delete(params).promise();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}
