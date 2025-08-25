import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | undefined;

export async function initDB() {
  if (db) return db;
  db = await open({ filename: './prim8.db', driver: sqlite3.Database });
  await db.exec(`CREATE TABLE IF NOT EXISTS prompts (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    timestamp TEXT,\n    prompt TEXT,\n    context TEXT,\n    script TEXT\n  )`);
  return db;
}

export async function logPrompt(prompt: string, context: string, script: string) {
  if (!db) await initDB();
  await db!.run('INSERT INTO prompts (timestamp, prompt, context, script) VALUES (?, ?, ?, ?)', new Date().toISOString(), prompt, context, script);
}
