export interface Database {
  createRecord(table: string, data: any): Promise<any>;
  readRecords(
    table: string,
    columns?: string[],
    whereClause?: string,
    values?: any[]
  ): Promise<any[]>;
  updateRecord(table: string, query: string, values: any[]): Promise<any>;
  deleteRecord(table: string, query: string, values: any[]): Promise<any>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
