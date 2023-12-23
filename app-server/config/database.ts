import knex, { Knex } from 'knex';

class Database {
  private static instance: Database;
  private _db: Knex;

  constructor() {
    this._db = knex({
      client: 'pg',
      connection: 'postgres://app_server_ch8:YLP7GE6qjWXpNHy@app-server-ch8-db.flycast:5432/app_server_ch8',
      searchPath: ['public'],
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  get db(): Knex {
    return this._db;
  }
}

export default Database.getInstance().db;
