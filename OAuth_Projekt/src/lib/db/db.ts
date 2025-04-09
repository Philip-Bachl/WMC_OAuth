import sqlite3 from "sqlite3";
import type { Database } from "sqlite3";
import { schemaScript } from "./schema";

const CONNECTION_STRING = "db.db";

export function createSqliteDbClient(): Database {
    const db = new sqlite3.Database(CONNECTION_STRING, (err) => {
        if (err) {
            //TODO
            throw err;
        }
    });

    //Schema Creation
    db.exec(schemaScript);

    return db;
}