import mysql, { Connection } from "mysql";
import { Exception } from "../errors/exception";
import { APP_EXCEPTION } from "../constants";
import { Mapper } from "../utils";

type Config = {
  host: string;
  user: string;
  database: string;
};

interface Pagination {
  event?: any;
  //
  limit?: number;
  page?: number;
  // --
  total?: number; // Total de elementos en la base de datos
  per_page?: number; // Elementos por página
  current_page?: number; // Página actual
  // --
  last_page?: number; // Última página disponible
  next_page_url?: string; // URL para la siguiente página
  prev_page_url?: string | null; // URL para la página anterior (null si no hay)
  from?: number; // Primer elemento de la página actual
  to?: number; // Último elemento de la página actual
}
interface ResultPagination {
  data: any;
  pagination: Pagination;
}

const configDefault: Config = {
  host: "localhost",
  user: "root",
  database: "db_samples"
};

interface SQLStatement {
  connection: Connection;
  statement: string | object;
  bindParams?: Record<string, any>;
  target?: any;
  manualMapping?: any[];
  config?: { timeout: number; isPageable: boolean };
}
interface QueryPageable {
  connection: Connection;
  projection?: string;
  selection?: string;
  statement?: string;
  bindParams?: Record<string, any>;
  target?: any;
  manualMapping?: any[];
  pagination?: Pagination;
  config?: { timeout: number; isPageable: boolean };
}

export class MysqlDriver {
  private static cnn: Connection | undefined;

  /**
   * Obtener conexión MySQL
   * @param newConnection
   * @returns {Promise<Connection | undefined>}
   */
  static async getConnection(newConnection = false): Promise<Connection | undefined> {
    console.log("[MySQLService.getConnection]", { newConnection });

    if (!newConnection) {
      if (this.cnn) {
        console.log("Conectado a la BD desde la caché");
      } else {
        this.cnn = await this.createConnection();
      }
      return this.cnn;
    }

    return this.createConnection();
  }

  /**
   * Crear conexión MySQL
   * @returns {Promise<Connection>}
   */
  static async createConnection(): Promise<Connection> {
    console.log("[MySQLService.createConnection]");

    try {
      const cnn = mysql.createConnection(configDefault);
      if (cnn) console.log("Conectado a la BD desde la caché");

      return cnn;
    } catch (error) {
      throw new Error("No se puede conectar a la BD");
    }
  }

  /**
   * Enlazar consulta SQL con parámetros
   * @param connection
   * @param statement
   * @param bindParams
   * @returns {Promise<string>}
   */
  static async bindQueryParams(connection: Connection, statement: string, bindParams: Record<string, any>): Promise<string> {
    console.log("[MySQLService.bindQueryParams]", { statement, bindParams });

    try {
      let bindSql = `${statement}`;

      Object.keys(bindParams).forEach((field) => {
        const paramSql = connection.escape(bindParams[field]);
        bindSql = bindSql.replace(new RegExp(`(:${field})\\b`, "g"), paramSql);
      });

      return bindSql;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * Cerrar conexión MySQL
   * @param connection
   * @returns {Promise<void>}
   */
  static async closeConnection(connection: Connection): Promise<void> {
    console.log("[MySQLService.closeConnection]");

    try {
      if (connection.state === "disconnected") return;

      connection.destroy();
    } catch (error) {
      throw new Exception({
        code: APP_EXCEPTION.DB_ERROR.code,
        messages: [APP_EXCEPTION.DB_ERROR.message]
      });
    }
  }

  /**
   * Ejecutar SQL
   * @param connection
   * @param statement
   * @param timeout
   * @returns {Promise<any>}
   */
  static async execute(connection: Connection, statement: string, { timeout }: { timeout: number }): Promise<any> {
    console.log("[MySQLService.execute]");

    try {
      const queryPromise = new Promise<any>((resolve, reject) => {
        console.debug("Script SQL: " + statement);
        connection.query({ sql: statement, timeout: timeout * 1000 }, (error, data) => {
          if (error) {
            return reject(error);
          }
          return resolve(data);
        });
      });

      return await queryPromise;
    } catch (error: any) {
      throw new Exception({
        code: error.code === "PROTOCOL_SEQUENCE_TIMEOUT" ? APP_EXCEPTION.DB_TIMEOUT_ERROR.code : APP_EXCEPTION.DB_ERROR.code,
        messages: [error.code === "PROTOCOL_SEQUENCE_TIMEOUT" ? APP_EXCEPTION.DB_TIMEOUT_ERROR.message : APP_EXCEPTION.DB_ERROR.message]
      });
    }
  }

  /**
   * Execute SQL Statement.
   * @param connection
   * @param statement
   * @param bindParams
   * @param target
   * @param manualMapping
   * @param config
   * @returns {Promise<any>}
   */
  static async executeSQLStatement({ connection, statement, bindParams = {}, target = null, manualMapping = null, config = { timeout: 15, isPageable: false } }: SQLStatement): Promise<any> {
    console.log("[MySQLService.executeSQLStatement]");

    try {
      let queryResult;

      if (typeof statement === "string") {
        const query = await this.bindQueryParams(connection, statement as string, bindParams);
        queryResult = await this.execute(connection, query, config);
      } else {
        queryResult = await this.execute(connection, statement as any, config);
      }

      if (Array.isArray(queryResult)) {
        const data = queryResult.map((row: any) => {
          if (manualMapping) {
            Object.entries(row).forEach(([key, value]) => {
              const mapper = manualMapping.find((obj) => {
                return key.toUpperCase() === obj.source.toUpperCase();
              });
              if (mapper) {
                row[mapper.target] = value;
                delete row[mapper.source];
                return;
              }
              row[key] = value;
            });
          }
          if (target) {
            return Mapper.sqlResultToObject(row, target);
          }
          return Mapper.sqlResultToObject(row);
        });

        if (config.isPageable) {
          const result = {
            data,
            getFirst: () => result.data[0]
          };
          console.log("Resultado 01 SQL: " + JSON.stringify(result));
          return result;
        } else {
          console.log("Resultado 02 SQL: " + JSON.stringify(data));
          return data;
        }
      }

      console.log("Resultado 03 SQL: " + JSON.stringify(queryResult));
      return queryResult;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Ejecutar consulta SQL con paginación
   * @param connection
   * @param projection
   * @param selection
   * @param statement
   * @param bindParams
   * @param target
   * @param manualMapping
   * @param pagination
   * @param config
   * @returns {Promise<{data: any[], pagination: object}>}
   */

  static async executeQueryPageable({
    connection,
    projection,
    selection,
    statement,
    bindParams = {},
    target,
    manualMapping,
    pagination = { limit: 0, page: 1, total: 0 },
    config = { timeout: 15, isPageable: true }
  }: QueryPageable): Promise<ResultPagination> {
    console.log("[MySQLService.executeQueryPageable]");

    try {
      const eventRequest = pagination.event;
      const limit = Number(pagination.limit);
      const page = Number(pagination.page);
      const offset = page > 1 ? (page - 1) * limit : 0;

      const query = `${statement || projection + " " + selection} LIMIT ${limit} OFFSET ${offset}`;
      const queryCount = `SELECT count(1) AS total FROM (${statement || `SELECT 1 ${selection}`}) q`;

      const [resultCount, resultContent] = await Promise.all([
        this.executeSQLStatement({
          connection,
          statement: queryCount,
          bindParams,
          config
        }),
        this.executeSQLStatement({
          connection,
          statement: query,
          bindParams,
          target,
          manualMapping,
          config
        })
      ]);

      const total = resultCount.getFirst() ? resultCount.getFirst().total : 0;
      const lastPage = Math.ceil(total / limit);
      const from = total > 0 ? (page - 1) * limit + 1 : 0;
      const to = Math.min(page * limit, total);
      const nextPage = page < lastPage ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      const protocol = "http";
      let baseUrl = `${protocol}://`;
      if (eventRequest) baseUrl += `${eventRequest.headers.Host}${eventRequest.requestContext.path}`;

      return {
        data: resultContent.data,
        pagination: {
          total,
          /*
            limit,
            page,
          */
          per_page: limit,
          current_page: page,
          last_page: lastPage,
          next_page_url: nextPage ? `${baseUrl}?limit=${limit}&page=${nextPage}` : null,
          prev_page_url: prevPage ? `${baseUrl}?limit=${limit}&page=${prevPage}` : null,
          from,
          to
        }
      } as ResultPagination;
    } catch (error) {
      throw error;
    }
  }
}
