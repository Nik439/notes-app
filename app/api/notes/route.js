import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./database.db", 
  driver: sqlite3.Database,
});

export async function GET(req, res) {

  const notes = await db.all("SELECT * FROM notes");

  return new Response(JSON.stringify(notes), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}