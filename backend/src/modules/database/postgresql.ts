import { Client, QueryConfig } from "pg";
import { Database } from "./database";
import { config } from "dotenv";

config();

const isDevelopment = process.env.NODE_ENV === "development";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: isDevelopment ? "localhost" : process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  database: process.env.DB_DATABASE,
};

class PostgreSQLDB implements Database {
  private client: Client;

  constructor() {
    this.client = new Client(dbConfig);
  }

  async connect(): Promise<void> {
    /**
     * This method is used to connect to the database.
     * @returns - A promise that resolves when the connection is established.
     */
    await this.client.connect();
  }

  async disconnect(): Promise<void> {
    /**
     * This method is used to disconnect from the database.
     * @returns - A promise that resolves when the connection is closed.
     */
    await this.client.end();
  }

  async createRecord(table: string, data: any): Promise<any> {
    /**
     * This method is used to create a record in a table.
     * @table - The table to create the record in.
     * @data - The data to be inserted into the table.
     * @returns - The created record.
     */
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map((_, index) => `$${index + 1}`);
      const queryConfig: QueryConfig = {
        text: `INSERT INTO ${table} (${keys.join(
          ", "
        )}) VALUES (${placeholders.join(", ")}) RETURNING *`,
        values: values,
      };
      const result = await this.client.query(queryConfig);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }

  async readRecords(
    table: string,
    columns: string[] = ["*"],
    whereClause?: string,
    values?: any[]
  ): Promise<any[]> {
    /**
     * This method is used to read records from a table.
     * @table - The table to read records from.
     * @columns - The columns to read from the table.
     * @whereClause - The where clause to use in the query.
     * @values - The values to be used in the query.
     * @returns - An array of records.
     */
    try {
      let queryText = `SELECT ${columns.join(", ")} FROM ${table}`;
      if (whereClause) {
        queryText += ` WHERE ${whereClause}`;
      }

      const queryConfig: QueryConfig = {
        text: queryText,
        values: values || [],
      };

      const result = await this.client.query(queryConfig);
      return result.rows;
    } catch (error) {
      throw new Error(`Error reading records: ${error.message}`);
    }
  }

  async updateRecord(
    table: string,
    query: string,
    values: any[]
  ): Promise<any> {
    /**
     * This method is used to update a record in a table.
     * @table - The table to update the record in.
     * @query - The where clause to use in the query.
     * @values - The values to be used in the query.
     * @returns - The updated record.
     */
    try {
      const queryConfig: QueryConfig = {
        text: `UPDATE ${table} SET ${query} RETURNING *`,
        values: values,
      };
      const result = await this.client.query(queryConfig);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }

  async deleteRecord(
    table: string,
    query: string,
    values: any[]
  ): Promise<any> {
    /**
     * This method is used to delete a record from a table.
     * @table - The table to delete the record from.
     * @query - The where clause to use in the query.
     * @values - The values to be used in the query.
     * @returns - The deleted record.
     */
    try {
      const queryConfig: QueryConfig = {
        text: `DELETE FROM ${table} WHERE ${query} RETURNING *`,
        values: values,
      };
      const result = await this.client.query(queryConfig);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
  }

  async countRecords(
    table: string,
    whereClause?: string,
    values?: any[]
  ): Promise<number> {
    /**
     * This method is used to count the number of records in a table.
     * @table - The table to count records from.
     * @whereClause - The where clause to use in the query.
     * @values - The values to be used in the query.
     * @returns - The number of records.
     */
    try {
      let queryText = `SELECT COUNT(*) FROM ${table}`;
      if (whereClause) {
        queryText += ` WHERE ${whereClause}`;
      }

      const queryConfig: QueryConfig = {
        text: queryText,
        values: values || [],
      };

      const result = await this.client.query(queryConfig);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error(`Error counting records: ${error.message}`);
    }
  }

  async executeRawQuery(query: string, values: any[] = []): Promise<any[]> {
    /**
     * This method is used to execute raw SQL queries.
     * !!WARNING!! : This method is not safe against SQL injection attacks.
     * @query - The SQL query to execute.
     * @values - The values to be used in the query.
     * @returns - An array of records.
     */
    try {
      const queryConfig: QueryConfig = {
        text: query,
        values: values,
      };
      const result = await this.client.query(queryConfig);
      return result.rows;
    } catch (error) {
      throw new Error(`Error executing raw query: ${error.message}`);
    }
  }
}

export default PostgreSQLDB;
