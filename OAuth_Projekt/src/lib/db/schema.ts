export const schemaScript: string = 
`CREATE TABLE IF NOT EXISTS Product (
    id TEXT PRIMARY KEY,
    name TEXT,
    price REAL,
    stock INTEGER
)`;