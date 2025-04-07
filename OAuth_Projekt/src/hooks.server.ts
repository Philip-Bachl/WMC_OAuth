import { schemaScript } from '$lib/db/schema';
import type { Handle } from '@sveltejs/kit';
import sqlite3 from "sqlite3";

const CONNECTION_STRING = "db.db";

export const handle: Handle = async ({ event, resolve }) => {
    if (!event.locals.db) {
        // This will create the database within the `db.sqlite` file.
        const db = new sqlite3.Database(CONNECTION_STRING, (err) => {
        if(err) {
            throw err;
        }
        });
        
        const schemaScriptPromise = new Promise((resolve, reject) => {
            // Schema Creation
            db.run(schemaScript, (err) => {
                if(err) {
                    reject(err);
                    console.error("schema script failed.");
                    return;
                }

                resolve(null);
            });
        });

        await schemaScriptPromise;

        // Set the db as our events.db variable.
        event.locals.db = db;
    }
    
    const response = await resolve(event);
    return response;
};