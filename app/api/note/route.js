import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./database.db", 
  driver: sqlite3.Database,
});

export async function POST(req) {
  const res = await req.json()
  let result = await db.run(`INSERT INTO notes(title, text, last_update) VALUES(?, ?, ?)`, res )

  return new Response(JSON.stringify({id: result.lastID}), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}