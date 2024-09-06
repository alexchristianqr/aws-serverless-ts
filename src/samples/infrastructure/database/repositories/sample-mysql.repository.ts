import { MysqlDriver as db } from "../../../../@common/drivers/mysql.driver.ts";
import { SampleOutputRepository } from "../../../domain/ports/output/sample-output.repository.ts";
import { SampleEntity } from "../../../domain/entities/sample.entity.ts";

interface Model extends SampleEntity {}

export class SampleMysqlRepository implements SampleOutputRepository<Model> {
  private tableMain = `samples`;

  constructor() {}

  async create(data: any): Promise<any> {
    const statement = `INSERT INTO ${this.tableMain} (title, description) VALUES (:title, :description)`;

    const connection = await db.getConnection();
    return db.executeSQLStatement({ connection, statement, bindParams: data });
  }

  async delete(id: number): Promise<any> {
    const statement = `DELETE FROM ${this.tableMain} WHERE id = :id`;

    const connection = await db.getConnection();
    return db.executeSQLStatement({ connection, statement, bindParams: { id } });
  }

  async getById(id: number): Promise<any> {
    const statement = `SELECT * FROM ${this.tableMain} WHERE id = :id`;

    const connection = await db.getConnection();
    const { getFirst } = await db.executeSQLStatement({ connection, statement, bindParams: { id } });
    return getFirst() as Function;
  }

  async getAll(request: any, isPageable: boolean = true): Promise<any> {
    const statement = `SELECT * FROM ${this.tableMain}`;

    const connection = await db.getConnection();
    if (isPageable) {
      const { limit, page, event } = request;
      return db.executeQueryPageable({ connection, statement, pagination: { limit, page, event } });
    } else {
      return db.executeSQLStatement({ connection, statement });
    }
  }

  async update(id: number, data: any): Promise<any> {
    const statement = `UPDATE ${this.tableMain} SET title = :title, description = :description WHERE id = :id`;

    const connection = await db.getConnection();
    return db.executeSQLStatement({ connection, statement, bindParams: { ...data, id } });
  }

  async updateField(id: number, request: any): Promise<boolean> {
    const { payload } = request;

    const [field] = Object.keys(payload);
    const value = payload[field];
    const statement = `UPDATE ${this.tableMain} SET ${field} = :${field} WHERE id = :id`;

    const connection = await db.getConnection();
    return db.executeSQLStatement({ connection, statement, bindParams: { [field]: value, id } });
  }
}
