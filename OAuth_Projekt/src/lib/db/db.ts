import sqlite3, { Database } from "sqlite3";
import { schemaScript } from "./schema";

const CONNECTION_STRING = "db.db";

export function createDbClient(): Database {
    const db = new sqlite3.Database(CONNECTION_STRING, (err) => {
        if(err) {
            //TODO
            throw err;
        }
    });

    //Schema Creation
    db.run(schemaScript);

    return db;
}