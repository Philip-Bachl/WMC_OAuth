export const schemaScript: string = 
`CREATE TABLE IF NOT EXISTS Product (
    Id TEXT PRIMARY KEY,
    Name TEXT,
    Price REAL,
    Stock INTEGER
)`;