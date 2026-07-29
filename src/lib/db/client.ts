import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

let instance: Database.Database | null = null;

function resolveDbPath(): string {
  const configured = process.env.DATABASE_PATH;
  if (configured) return configured;
  return path.join(process.cwd(), 'data', 'crm.db');
}

function applySchema(db: Database.Database) {
  const schemaPath = path.join(process.cwd(), 'src', 'lib', 'db', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
}

export function getDb(): Database.Database {
  if (instance) return instance;

  const dbPath = resolveDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  applySchema(db);

  instance = db;
  return instance;
}

export function closeDb() {
  if (instance) {
    instance.close();
    instance = null;
  }
}
